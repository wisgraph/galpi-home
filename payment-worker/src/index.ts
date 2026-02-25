import { Router, error, json } from 'itty-router';
import { sendBill } from './paymint';
import { formatPhone, formatPrice, generateBillId } from './utils';

const router = Router();

// CORS 헤더 설정 유틸리티
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// OPTIONS 요청 처리 (CORS preflight)
router.options('*', () => new Response(null, { headers: corsHeaders }));

// 1. 청구서 발송 API
router.post('/api/payments/send', async (request, env) => {
    try {
        const body = await request.json() as any;
        const { name, phone, email, coupon_code } = body;

        if (!name || !phone || !email) {
            return new Response(JSON.stringify({ success: false, error: '필수 정보가 누락되었습니다.' }), { status: 400, headers: corsHeaders });
        }

        // 기본 금액
        let finalPrice = 7000; // 실제 상품 가격 ₩7,000

        // 쿠폰 검증 및 할인 적용 (KV 없으면 스킵)
        if (coupon_code && env.PAYMENTS_KV) {
            try {
                const upperCode = coupon_code.trim().toUpperCase();
                const couponDataStr = await env.PAYMENTS_KV.get(`COUPON_${upperCode}`);
                if (couponDataStr) {
                    const couponData = JSON.parse(couponDataStr);
                    if (couponData.type === 'fixed') {
                        finalPrice = Math.max(0, finalPrice - couponData.amount);
                    } else if (couponData.type === 'percent') {
                        finalPrice = Math.floor(finalPrice * (1 - couponData.amount / 100));
                    }
                }
            } catch (e) {
                console.warn('KV lookup failed (local dev?):', e);
            }
        }

        const bill_id = generateBillId(env.BUSINESS_NUMBER || '4831402933');
        const cleanPhone = formatPhone(phone);
        const cleanPrice = formatPrice(finalPrice);

        // KV에 사용자 정보 임시 저장 (없으면 스킵)
        if (env.PAYMENTS_KV) {
            try {
                const userData = {
                    name,
                    phone: cleanPhone,
                    email,
                    basePrice: 7000,
                    finalPrice,
                    coupon_code: coupon_code || '',
                    createdAt: new Date().toISOString()
                };
                console.log(`[DEBUG] KV Saving user data for ${bill_id}:`, JSON.stringify(userData));
                await env.PAYMENTS_KV.put(`PAYMENT_${bill_id}`, JSON.stringify(userData), { expirationTtl: 3600 * 24 });
                console.log(`[DEBUG] KV Put Success: PAYMENT_${bill_id} 저장 완료`);
            } catch (e: any) {
                console.error(`[ERROR] KV put failed for ${bill_id}:`, e.message);
            }
        }

        // Paymint API 키 없으면 로컬 개발 모의 응답
        if (!env.PAYMINT_API_KEY) {
            console.log('[DEV] Paymint API key missing - returning mock response');
            return new Response(JSON.stringify({
                success: true,
                data: {
                    code: '0000',
                    msg: '성공 (개발 모드)',
                    shortURL: `https://pay.paymint.co.kr/mock/${bill_id}`,
                    bill_id
                }
            }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const PAYMINT_API_KEY = env.PAYMINT_API_KEY;
        const PAYMINT_MEMBER = env.PAYMINT_MEMBER;
        const PAYMINT_MERCHANT = env.PAYMINT_MERCHANT;

        const payload = {
            apikey: PAYMINT_API_KEY,
            member: PAYMINT_MEMBER,
            merchant: PAYMINT_MERCHANT,
            bill: {
                bill_id,
                product_nm: '갈피(Galpi) 프리미엄 라이선스',
                message: '갈피 프리미엄 결제를 진행합니다.',
                member_nm: name,
                phone: cleanPhone,
                price: cleanPrice,
                expire_dt: '2099-12-31',
                callbackURL: `${env.WORKER_URL}/api/payments/callback`
            }
        };

        console.log('[DEBUG] Sending request to Paymint:', JSON.stringify(payload, null, 2));

        const response = await sendBill({
            bill_id,
            product_nm: '갈피(Galpi) 프리미엄 라이선스',
            message: '갈피 프리미엄 결제를 진행합니다.',
            member_nm: name,
            phone: cleanPhone,
            price: cleanPrice,
            expire_dt: '2099-12-31',
            callbackURL: `${env.WORKER_URL}/api/payments/callback`
        }, env);

        console.log('[DEBUG] Received response from Paymint:', JSON.stringify(response, null, 2));

        return new Response(JSON.stringify({
            success: response.code === '0000',
            data: response,
            error: response.code !== '0000' ? (response.msg || '페이민트 API 오류') : undefined
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (error: any) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: corsHeaders });
    }
});

// 2. 결제 완료 콜백 API (ctx 추가로 비동기 작업 지원)
router.post('/api/payments/callback', async (request, env, ctx) => {
    try {
        let body: any = {};
        const contentType = request.headers.get('Content-Type') || '';

        if (contentType.includes('application/json')) {
            body = await request.json();
        } else {
            const formData = await request.formData();
            for (const [key, value] of formData.entries()) {
                body[key] = value;
            }
        }

        console.log(`[DEBUG] Final Parsed Body:`, JSON.stringify(body));

        // 실시간 로그에서 확인된 필드명 토대로 추출 (Paymint 실제 응답 필드 반영)
        const result = body.result || (body.appr_state === 'F' ? '0000' : (body.res_cd || body.code));
        const bill_id = body.bill_id || body.order_id || body.ord_no;
        const price = body.price || body.appr_price || body.amt || body.amount;

        console.log(`[DEBUG] Extracted -> bill_id: ${bill_id}, result: ${result} (state: ${body.appr_state}), price: ${price}`);

        if (!bill_id) {
            console.error('[ERROR] No bill_id found in callback body');
            return new Response(JSON.stringify({ result: 'OK' }), { headers: { 'Content-Type': 'application/json' } });
        }

        // 결제 성공 시에만 처리
        if (result === '0000' || body.appr_num || result === 'OK' || result === 'success') {

            // [중요] 중복 발급 방지 필터링 (Idempotency)
            if (env.PAYMENTS_KV) {
                const alreadyHandled = await env.PAYMENTS_KV.get(`HANDLED_${bill_id}`);
                if (alreadyHandled) {
                    console.log(`[DEBUG] Already handled bill_id: ${bill_id}. Skipping duplicate trigger.`);
                    return new Response(JSON.stringify({ result: 'OK' }), { headers: { 'Content-Type': 'application/json' } });
                }
                // 즉시 마킹 (동시성 방지)
                await env.PAYMENTS_KV.put(`HANDLED_${bill_id}`, 'true', { expirationTtl: 3600 * 24 * 7 });
            }

            const userDataStr = await env.PAYMENTS_KV.get(`PAYMENT_${bill_id}`);
            console.log(`[DEBUG] KV Lookup for PAYMENT_${bill_id}:`, userDataStr ? 'Found' : 'Not Found');

            if (!userDataStr) {
                console.error(`[CRITICAL] No user data found for bill_id: ${bill_id}.`);
                return new Response(JSON.stringify({ result: 'FAIL', message: 'User data not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
            }

            const userData = JSON.parse(userDataStr);

            // 실제 라이선스 발급 트리거 (Google Form 전송)는 비동기로 처리
            // 이를 통해 페이민트에 'OK' 응답을 빛의 속도로 돌려줄 수 있음 (타임아웃 방지)
            const triggerLicense = async () => {
                const formData = new URLSearchParams();
                formData.append('entry.48333038', userData.email);
                formData.append('entry.1776154045', bill_id);
                formData.append('entry.2087199898', price.toString());

                const productName = userData.coupon_code
                    ? `갈피(Galpi) 프리미엄 (${userData.coupon_code})`
                    : '갈피(Galpi) 프리미엄';

                formData.append('entry.1427011517', productName);
                formData.append('entry.2009005118', userData.name);
                formData.append('entry.303484727', 'paymint');

                const googleFormUrl = env.GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSem4V9TELLO75O5a2wF65f-eaFZ_ifH5SyGOpfxB_pqNFr4EQ/formResponse';
                console.log(`[ASYNC] Triggering Google Form for: ${userData.email}`);

                try {
                    await fetch(googleFormUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });
                    console.log(`[ASYNC] Google Form Trigger Success: ${bill_id}`);
                } catch (e: any) {
                    console.error(`[ASYNC ERROR] Google Form Trigger Failed: ${e.message}`);
                    // 실패 시 KV 마킹 삭제하여 재시도 가능하게 할 수도 있지만, 
                    // 보통 페이민트가 다시 콜백을 주므로 일단 로그만 남김
                }
            };

            // 작업 예약 (응답은 즉시 반환)
            if (ctx && ctx.waitUntil) {
                ctx.waitUntil(triggerLicense());
            } else {
                // 로컬 환경 등 ctx가 없는 경우
                await triggerLicense();
            }
        }

        return new Response(JSON.stringify({ result: 'OK' }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
        console.error('[ERROR] Callback processing failed:', error.message);
        return new Response(JSON.stringify({ result: 'FAIL' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
});

// 3. 쿠폰 검증 API
router.post('/api/payments/verify-coupon', async (request, env) => {
    try {
        const body = await request.json();
        const { code } = body;

        if (!code) {
            return new Response(JSON.stringify({ valid: false, message: '코드를 입력하세요.' }), { status: 400, headers: corsHeaders });
        }

        const upperCode = code.trim().toUpperCase();

        // KV 없으면 하드코딩 테스트 쿠폰 반환
        if (!env.PAYMENTS_KV) {
            if (upperCode === 'THEBETTER2026') {
                return new Response(JSON.stringify({ valid: true, data: { type: 'fixed', amount: 1000, name: '커뮤니티 특별 혜택' } }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
            if (upperCode === 'BETA50') {
                return new Response(JSON.stringify({ valid: true, data: { type: 'percent', amount: 50, name: '베타테스터 반값' } }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({ valid: false, message: '유효하지 않은 쿠폰입니다.' }), { status: 404, headers: corsHeaders });
        }

        const couponDataStr = await env.PAYMENTS_KV.get(`COUPON_${upperCode}`);

        if (!couponDataStr) {
            // 로컬 개발/테스트용 하드코딩 (KV에 데이터 없을 때)
            if (upperCode === 'THEBETTER2026') {
                return new Response(JSON.stringify({ valid: true, data: { type: 'fixed', amount: 1000, name: '커뮤니티 특별 혜택' } }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
            if (upperCode === 'BETA50') {
                return new Response(JSON.stringify({ valid: true, data: { type: 'percent', amount: 50, name: '베타테스터 반값' } }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            return new Response(JSON.stringify({ valid: false, message: '유효하지 않은 쿠폰입니다.' }), { status: 404, headers: corsHeaders });
        }

        return new Response(JSON.stringify({ valid: true, data: JSON.parse(couponDataStr) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ valid: false, error: '서버 오류' }), { status: 500, headers: corsHeaders });
    }
});

// 4. 결제 취소 API
router.post('/api/payments/cancel', async (request, env) => {
    try {
        const body = await request.json();
        const { bill_id, price } = body;

        if (!bill_id || !price) {
            return new Response(JSON.stringify({ success: false, error: 'bill_id와 price가 필요합니다.' }), { status: 400, headers: corsHeaders });
        }

        const cancelResponse = await import('./paymint').then(m => m.cancelPayment(bill_id, price, env));

        if (cancelResponse.code !== '0000') {
            return new Response(JSON.stringify({ success: false, error: cancelResponse.msg || '페이민트 취소 실패' }), { status: 400, headers: corsHeaders });
        }

        return new Response(JSON.stringify({ success: true, data: cancelResponse }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (error: any) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: corsHeaders });
    }
});

// 404 처리
router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
    async fetch(request: Request, env: any, ctx: any) {
        return router.fetch(request, env, ctx);
    }
};
