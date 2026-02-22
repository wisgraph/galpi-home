import { NextRequest, NextResponse } from 'next/server';
import { sendBill } from '@/lib/paymint';
import { generateBillId, formatPhone, formatPrice } from '@/lib/utils';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { member_nm, phone, email, product_nm, message, price } = body;

        if (!member_nm || !phone || !product_nm || !price || !email) {
            return NextResponse.json(
                { error: '이메일을 포함한 필수 항목이 누락되었습니다' },
                { status: 400 }
            );
        }

        const cleanPhone = formatPhone(phone);
        const cleanPrice = formatPrice(price);
        const bill_id = generateBillId();

        // [Cloudflare KV 저장] 
        // bill_id를 키로 사용하여 사용자 정보를 저장합니다. (콜백 시 이메일 확인용)
        // Next.js on Cloudflare Pages/Workers 환경에서는 환경변수처럼 바인딩에 접근합니다.
        const KV = (process.env as any).PAYMENTS_KV;

        if (KV) {
            await KV.put(bill_id, JSON.stringify({
                email,
                member_nm,
                product_nm,
                price: cleanPrice
            }), {
                expirationTtl: 60 * 60 * 24 * 3 // 3일 후 자동 삭제
            });
        } else {
            console.warn('PAYMENTS_KV binding not found. State will not be preserved.');
        }

        const paymintResponse = await sendBill({
            bill_id,
            product_nm,
            message: message || '갈피 프로 얼리버드 라이선스 결제 청구서입니다.',
            member_nm,
            phone: cleanPhone,
            price: cleanPrice,
            expire_dt: '2099-12-31',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/callback`
        });

        if (paymintResponse.code !== '0000') {
            throw new Error(paymintResponse.msg || '청구서 발송 실패');
        }

        return NextResponse.json({
            success: true,
            data: {
                bill_id,
                shortURL: paymintResponse.shortURL
            }
        });

    } catch (error) {
        console.error('Payment Send Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : '청구서 발송 실패'
            },
            { status: 500 }
        );
    }
}
