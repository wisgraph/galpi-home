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

        const bill_id = generateBillId(env.BUSINESS_NUMBER || '1234567890');
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

// 2. 결제 완료 콜백 API
router.post('/api/payments/callback', async (request, env) => {
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
        const result = body.result || body.appr_state === 'F' ? '0000' : (body.res_cd || body.code);
        const bill_id = body.bill_id || body.order_id || body.ord_no;
        const price = body.price || body.appr_price || body.amt || body.amount;

        console.log(`[DEBUG] Extracted -> bill_id: ${bill_id}, result: ${result} (state: ${body.appr_state}), price: ${price}`);

        // 결제 성공 시에만 처리 (appr_state 'F'는 승인 성공을 의미하는 것으로 보임)
        if (result === '0000' || body.appr_num || result === 'OK' || result === 'success') {
            const userDataStr = await env.PAYMENTS_KV.get(`PAYMENT_${bill_id}`);
            console.log(`[DEBUG] KV Lookup for PAYMENT_${bill_id}:`, userDataStr ? 'Found' : 'Not Found');

            if (!userDataStr) {
                console.error(`[CRITICAL] No user data found for bill_id: ${bill_id}. Cannot issue license.`);
                return new Response(JSON.stringify({ result: 'FAIL', message: 'User data not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
            }

            const userData = JSON.parse(userDataStr);
            console.log(`[DEBUG] User found in KV: name=${userData.name}, email=${userData.email}`);
            console.log(`[DEBUG] Sending license trigger for: ${userData.email}`);

            // 구글 폼으로 전송 (라이선스 발급용)
            const formData = new URLSearchParams();
            formData.append('entry.48333038', userData.email);      // 이메일
            formData.append('entry.1776154045', bill_id);           // TID (주문번호)
            formData.append('entry.2087199898', price.toString());  // 금액

            const productName = userData.coupon_code
                ? `갈피(Galpi) 프리미엄 (${userData.coupon_code})`
                : '갈피(Galpi) 프리미엄';

            formData.append('entry.1427011517', productName);       // 상품명
            formData.append('entry.2009005118', userData.name);     // 이름(닉네임)
            formData.append('entry.303484727', 'paymint');          // 결제방식

            const googleFormUrl = env.GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSem4V9TELLO75O5a2wF65f-eaFZ_ifH5SyGOpfxB_pqNFr4EQ/formResponse';
            console.log(`[DEBUG] Triggering Google Form: ${googleFormUrl}`);

            const gResponse = await fetch(googleFormUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            console.log(`[DEBUG] Google Form Triggered. Status: ${gResponse.status}`);
        }

        // 페이민트 요구 응답 형식
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
