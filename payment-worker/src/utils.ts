// SHA256 해시 생성 (Edge Runtime/Web Crypto 지원 버전)
export async function createHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 전화번호 포맷팅 (하이픈 제거)
export function formatPhone(phone: string): string {
    return phone.replace(/-/g, '');
}

// 금액 포맷팅 (콤마 제거)
export function formatPrice(price: number | string): string {
    return price.toString().replace(/,/g, '');
}

// bill_id 생성
export function generateBillId(businessNumber: string): string {
    const timestamp = Date.now().toString().slice(-9);
    return `${businessNumber}-${timestamp}`;
}
