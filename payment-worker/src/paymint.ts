import { createHash } from './utils';

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

export async function sendBill(params: SendBillParams, env: any): Promise<PaymintResponse> {
    const PAYMINT_BASE_URL = env.PAYMINT_BASE_URL || 'http://stg.paymint.co.kr:10200';
    const PAYMINT_API_KEY = env.PAYMINT_API_KEY;
    const PAYMINT_MEMBER = env.PAYMINT_MEMBER;
    const PAYMINT_MERCHANT = env.PAYMINT_MERCHANT;

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

export async function cancelPayment(bill_id: string, price: string, env: any): Promise<PaymintResponse> {
    const PAYMINT_BASE_URL = env.PAYMINT_BASE_URL || 'http://stg.paymint.co.kr:10200';
    const PAYMINT_API_KEY = env.PAYMINT_API_KEY;
    const PAYMINT_MEMBER = env.PAYMINT_MEMBER;
    const PAYMINT_MERCHANT = env.PAYMINT_MERCHANT;

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
