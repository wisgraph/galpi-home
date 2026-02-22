import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const PAYMINT_MEMBER = process.env.PAYMINT_MEMBER || 'TEST-MEMBER-FOR-API';
const PAYMINT_MERCHANT = process.env.PAYMINT_MERCHANT || 'TEST-MERCHANT-FOR-API';
const GOOGLE_FORM_URL = process.env.GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/your-form-id/formResponse';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            apikey,
            bill_id,
            appr_state,
            appr_num,
            appr_price,
            appr_dt
        } = body;

        console.log(`[PAYMINT CALLBACK] bill_id: ${bill_id}, state: ${appr_state}`);

        if (!bill_id || !appr_state) {
            return NextResponse.json({
                code: '9999',
                msg: '필수 필드 누락'
            });
        }

        // 결제 완료('F') 상태일 때만 구글 폼 트리거
        if (appr_state === 'F') {
            const KV = (process.env as any).PAYMENTS_KV;
            let userInfo = null;

            if (KV) {
                const data = await KV.get(bill_id);
                if (data) {
                    userInfo = JSON.parse(data);
                }
            }

            if (userInfo) {
                // 구글 폼에 데이터 전송 (사용자 제공 형식에 맞춤)
                const formData = new URLSearchParams();
                formData.append('entry.48333038', userInfo.email);
                formData.append('entry.1776154045', bill_id); // TID 대용
                formData.append('entry.2087199898', userInfo.price);
                formData.append('entry.1427011517', userInfo.product_nm);
                formData.append('entry.2009005118', userInfo.member_nm);
                formData.append('entry.303484727', 'Paymint'); // 출처 표시

                try {
                    const googleResponse = await fetch(GOOGLE_FORM_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData.toString(),
                    });

                    if (googleResponse.ok) {
                        console.log(`Google Form submitted successfully for ${userInfo.email}`);
                        // 성공 후 KV에서 삭제하거나 결제 완료 표시를 남길 수 있음
                        if (KV) await KV.delete(bill_id);
                    } else {
                        console.error('Google Form submission failed:', googleResponse.statusText);
                    }
                } catch (err) {
                    console.error('Error submitting to Google Form:', err);
                }
            } else {
                console.warn(`No user info found for bill_id: ${bill_id} in KV.`);
            }
        }

        // 결제선생 측에 성공 응답 반환 (무조건 성공 응답을 주어야 재전송을 막음)
        return NextResponse.json({
            apikey: apikey || '',
            member: PAYMINT_MEMBER,
            merchant: PAYMINT_MERCHANT,
            bill_id: bill_id,
            code: '0000',
            msg: '성공하였습니다.'
        });

    } catch (error) {
        console.error('Payment Callback Error:', error);
        return NextResponse.json({
            code: '9999',
            msg: '처리 중 오류 발생'
        });
    }
}
