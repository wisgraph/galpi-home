import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { code } = body;

        if (!code || typeof code !== 'string') {
            return NextResponse.json(
                { valid: false, message: '쿠폰 코드를 입력하세요.' },
                { status: 400 }
            );
        }

        const upperCode = code.trim().toUpperCase();
        const KV = (process.env as any).PAYMENTS_KV;
        let couponDataStr = null;

        if (KV) {
            // KV에 COUPON_ 접두사로 저장된 쿠폰 정보를 확인합니다.
            // 데이터 형태 예시: {"type": "fixed", "amount": 1000} 
            // 또는 {"type": "percent", "amount": 20}
            couponDataStr = await KV.get(`COUPON_${upperCode}`);
        } else if (process.env.NODE_ENV === 'development') {
            // 테스트 모드이면서 KV 연결이 안 된 로컬 개발 환경용 더미 모의 쿠폰 처리
            if (upperCode === 'THEBETTER2026') {
                couponDataStr = JSON.stringify({ type: 'fixed', amount: 1000, name: '커뮤니티 특별 혜택' });
            } else if (upperCode === 'BETA50') {
                couponDataStr = JSON.stringify({ type: 'percent', amount: 50, name: '베타테스터 반값' });
            }
        }

        if (!couponDataStr) {
            return NextResponse.json(
                { valid: false, message: '유효하지 않거나 만료된 쿠폰 코드입니다.' },
                { status: 400 }
            );
        }

        const couponData = JSON.parse(couponDataStr);

        return NextResponse.json({
            valid: true,
            data: couponData
        });

    } catch (error) {
        console.error('Coupon verify error:', error);
        return NextResponse.json(
            { valid: false, message: '쿠폰 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
