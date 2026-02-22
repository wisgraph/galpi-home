import { createHash } from './utils';

const PAYMINT_BASE_URL = process.env.PAYMINT_BASE_URL || 'http://stg.paymint.co.kr:10200';
const PAYMINT_API_KEY = process.env.PAYMINT_API_KEY || 'TEST-API-KEY-TALK';
const PAYMINT_MEMBER = process.env.PAYMINT_MEMBER || 'TEST-MEMBER-FOR-API';
const PAYMINT_MERCHANT = process.env.PAYMINT_MERCHANT || 'TEST-MERCHANT-FOR-API';

export interface SendBillParams {
    bill_id: string;
    product_nm: string;
    message: string;
    member_nm: string;
    phone: string;
    price: string;
    expire_dt: string;
    callbackURL: string;
}

export interface PaymintResponse {
    code: string;
    msg: string;
    shortURL?: string;
    bill_id?: string;
    hash?: string;
}

/**
 * 청구서 발송 API 호출 (Fetch API 사용 - Edge Runtime 호환)
 */
export async function sendBill(params: SendBillParams): Promise<PaymintResponse> {
    const hashString = `${params.bill_id},${params.phone},${params.price}`;
    const hash = await createHash(hashString);

    const response = await fetch(`${PAYMINT_BASE_URL}/if/bill/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            apikey: PAYMINT_API_KEY,
            member: PAYMINT_MEMBER,
            merchant: PAYMINT_MERCHANT,
            bill: {
                ...params,
                hash
            }
        })
    });

    if (!response.ok) {
        throw new Error(`페이민트 API 응답 오류: ${response.statusText}`);
    }

    return response.json();
}

/**
 * 결제 취소 API 호출
 */
export async function cancelPayment(bill_id: string, price: string): Promise<PaymintResponse> {
    const hashString = `${bill_id},${price}`;
    const hash = await createHash(hashString);

    const response = await fetch(`${PAYMINT_BASE_URL}/if/bill/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            apikey: PAYMINT_API_KEY,
            member: PAYMINT_MEMBER,
            merchant: PAYMINT_MERCHANT,
            bill_id,
            price,
            hash
        })
    });

    if (!response.ok) {
        throw new Error(`페이민트 취소 API 응답 오류: ${response.statusText}`);
    }

    return response.json();
}
