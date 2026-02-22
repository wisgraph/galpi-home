import { Router } from 'itty-router';
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
        const body = await request.json();
        const { name, phone, email, coupon_code } = body;

        if (!name || !phone || !email) {
            return new Response(JSON.stringify({ error: '필수 정보가 누락되었습니다.' }), { status: 400, headers: corsHeaders });
        }

        // 기본 금액
        let finalPrice = 10000; // ₩10,000

        // 쿠폰 검증 및 할인 적용
        if (coupon_code) {
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
        }

        const bill_id = generateBillId(env.BUSINESS_NUMBER || '1234567890');
        const cleanPhone = formatPhone(phone);
        const cleanPrice = formatPrice(finalPrice);

        // KV에 사용자 정보 임시 저장 (콜백 시 활용)
        await env.PAYMENTS_KV.put(`PAYMENT_${bill_id}`, JSON.stringify({
            name,
            phone: cleanPhone,
            email,
            basePrice: 10000,
            finalPrice,
            coupon_code: coupon_code || '',
            createdAt: new Date().toISOString()
        }), { expirationTtl: 3600 * 24 }); // 24시간 유효

        const response = await sendBill({
            bill_id,
            product_nm: '갈피(Galpi) 프리미엄 라이선스',
            message: '갈피 프리미엄 결제를 진행합니다.',
            member_nm: name,
            phone: cleanPhone,
            price: cleanPrice,
            expire_dt: '',
            callbackURL: `${env.WORKER_URL}/api/payments/callback`
        }, env);

        return new Response(JSON.stringify(response), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
});

// 2. 결제 완료 콜백 API
router.post('/api/payments/callback', async (request, env) => {
    try {
        const body = await request.json();
        const { result, bill_id, price } = body;

        // 결제 성공 시에만 처리
        if (result === '0000') {
            const userDataStr = await env.PAYMENTS_KV.get(`PAYMENT_${bill_id}`);
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);

                // 구글 폼으로 전송 (라이선스 발급용)
                const formData = new URLSearchParams();
                formData.append('entry.1234567890', userData.email); // 예시 ID
                formData.append('entry.2345678901', bill_id);
                formData.append('entry.3456789012', price);
                formData.append('entry.4567890123', '갈피(Galpi) 프리미엄');
                formData.append('entry.5678901234', userData.name);
                formData.append('entry.6789012345', 'paymint');

                await fetch(env.GOOGLE_FORM_URL, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            }
        }

        // 페이민트 요구 응답 형식
        return new Response(JSON.stringify({ result: 'OK' }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
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
        const couponDataStr = await env.PAYMENTS_KV.get(`COUPON_${upperCode}`);

        if (!couponDataStr) {
            // 로컬 개발/테스트용 하드코딩 (KV에 데이터 없을 때)
            if (upperCode === 'THEBETTER2026') {
                return new Response(JSON.stringify({ valid: true, data: { type: 'fixed', amount: 1000, name: '커뮤니티 특별 혜택' } }), { headers: corsHeaders });
            }
            if (upperCode === 'BETA50') {
                return new Response(JSON.stringify({ valid: true, data: { type: 'percent', amount: 50, name: '베타테스터 반값' } }), { headers: corsHeaders });
            }

            return new Response(JSON.stringify({ valid: false, message: '유효하지 않은 쿠폰입니다.' }), { status: 404, headers: corsHeaders });
        }

        return new Response(JSON.stringify({ valid: true, data: JSON.parse(couponDataStr) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ valid: false, error: '서버 오류' }), { status: 500, headers: corsHeaders });
    }
});

// 404 처리
router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
    async fetch(request: Request, env: any) {
        return router.handle(request, env);
    }
};
