# 청구서 발송 API (NextJS)

## 목차
1. [API 개요](#api-개요)
2. [페이민트 API 스펙](#페이민트-api-스펙)
3. [구현 파일 구조](#구현-파일-구조)
4. [코드 구현](#코드-구현)
5. [테스트](#테스트)

---

## API 개요

### NextJS API Route 엔드포인트
- URI: `/api/payments/send`
- Method: `POST`
- 처리: 서버사이드에서 DB 저장 및 페이민트 API 호출

### 페이민트 API 엔드포인트
- URI: `/if/bill/send`
- Method: `POST`
- Base URL: `http://stg.paymint.co.kr:10200/` (테스트)

### 처리 흐름

```
[Client]
  |
  v
POST /api/payments/send
  |
  v
[API Route Handler]
  |
  +---> 1. bill_id 생성
  |
  +---> 2. hash 생성
  |
  +---> 3. DB에 저장 (status: PENDING)
  |
  +---> 4. 페이민트 API 호출
  |
  +---> 5. short_url 받아서 DB 업데이트
  |
  v
[Response to Client]
```

---

## 페이민트 API 스펙

### 요청 파라미터

```typescript
interface PaymintSendRequest {
  apikey: string;
  member: string;
  merchant: string;
  bill: {
    bill_id: string;        // 20자리, 테스트: "사업자번호-10자리"
    product_nm: string;     // 상품명 (최대 100자)
    message: string;        // 안내메시지 (최대 500자)
    member_nm: string;      // 고객명 (최대 30자)
    phone: string;          // 하이픈 제거
    price: string;          // 콤마 제거, 문자열
    hash: string;           // SHA256(bill_id + "," + phone + "," + price)
    expire_dt: string;      // YYYY-MM-DD
    callbackURL: string;    // 결제완료 콜백 URL
  };
}
```

### 응답 데이터

```typescript
interface PaymintSendResponse {
  apikey: string;
  member: string;
  merchant: string;
  bill_id: string;
  hash: string;
  shortURL: string;  // 청구서 URL
  code: string;      // "0000": 성공
  msg: string;       // 결과 메시지
}
```

---

## 구현 파일 구조

```
lib/
├── db.ts                    # PostgreSQL 연결
├── paymint.ts              # 페이민트 API 클라이언트
└── utils.ts                # 유틸리티 함수

app/
└── api/
    └── payments/
        └── send/
            └── route.ts    # 청구서 발송 API Route

types/
└── payment.ts              # 타입 정의
```

---

## 코드 구현

### 1. 유틸리티 함수 (lib/utils.ts)

```typescript
import crypto from 'crypto';

// SHA256 해시 생성
export function createHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 전화번호 포맷팅 (하이픈 제거)
export function formatPhone(phone: string): string {
  return phone.replace(/-/g, '');
}

// 금액 포맷팅 (콤마 제거)
export function formatPrice(price: number): string {
  return price.toString().replace(/,/g, '');
}

// bill_id 생성
export function generateBillId(): string {
  const businessNumber = '1234567890'; // 사업자번호
  const timestamp = Date.now();
  return `${businessNumber}-${timestamp}`;
}
```

### 2. 페이민트 API 클라이언트 (lib/paymint.ts)

```typescript
import axios from 'axios';
import { createHash } from './utils';

const PAYMINT_BASE_URL = process.env.PAYMINT_BASE_URL || 'http://stg.paymint.co.kr:10200';
const PAYMINT_API_KEY = process.env.PAYMINT_API_KEY || 'TEST-API-KEY-TALK';
const PAYMINT_MEMBER = process.env.PAYMINT_MEMBER || 'TEST-MEMBER-FOR-API';
const PAYMINT_MERCHANT = process.env.PAYMINT_MERCHANT || 'TEST-MERCHANT-FOR-API';

interface SendBillParams {
  bill_id: string;
  product_nm: string;
  message: string;
  member_nm: string;
  phone: string;
  price: string;
  expire_dt: string;
  callbackURL: string;
}

interface PaymintResponse {
  code: string;
  msg: string;
  shortURL?: string;
  bill_id?: string;
  hash?: string;
}

// 청구서 발송
export async function sendBill(params: SendBillParams): Promise<PaymintResponse> {
  // hash 생성: bill_id + "," + phone + "," + price
  const hashString = `${params.bill_id},${params.phone},${params.price}`;
  const hash = createHash(hashString);
  
  try {
    const response = await axios.post(
      `${PAYMINT_BASE_URL}/if/bill/send`,
      {
        apikey: PAYMINT_API_KEY,
        member: PAYMINT_MEMBER,
        merchant: PAYMINT_MERCHANT,
        bill: {
          ...params,
          hash
        }
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        timeout: 10000 // 10초 타임아웃
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`페이민트 API 오류: ${error.message}`);
    }
    throw error;
  }
}

// 결제 취소
export async function cancelPayment(bill_id: string, price: string): Promise<PaymintResponse> {
  // hash 생성: bill_id + "," + price
  const hashString = `${bill_id},${price}`;
  const hash = createHash(hashString);
  
  try {
    const response = await axios.post(
      `${PAYMINT_BASE_URL}/if/bill/cancel`,
      {
        apikey: PAYMINT_API_KEY,
        member: PAYMINT_MEMBER,
        merchant: PAYMINT_MERCHANT,
        bill_id,
        price,
        hash
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        timeout: 10000
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`페이민트 API 오류: ${error.message}`);
    }
    throw error;
  }
}
```

### 3. API Route 핸들러 (app/api/payments/send/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query, transaction } from '@/lib/db';
import { sendBill } from '@/lib/paymint';
import { generateBillId, formatPhone, formatPrice, createHash } from '@/lib/utils';

// POST /api/payments/send
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 데이터 파싱
    const body = await request.json();
    const { member_nm, phone, email, product_nm, message, price } = body;
    
    // 2. 유효성 검사
    if (!member_nm || !phone || !product_nm || !price) {
      return NextResponse.json(
        { error: '필수 항목이 누락되었습니다' },
        { status: 400 }
      );
    }
    
    // 3. 데이터 포맷팅
    const cleanPhone = formatPhone(phone);
    const cleanPrice = formatPrice(price);
    
    // 4. bill_id 생성
    const bill_id = generateBillId();
    
    // 5. hash 생성
    const hashString = `${bill_id},${cleanPhone},${cleanPrice}`;
    const hash = createHash(hashString);
    
    // 6. 트랜잭션으로 처리
    const result = await transaction(async (client) => {
      // DB에 청구서 저장
      await client.query(
        `INSERT INTO payments (
          bill_id, member, merchant, member_nm, phone, email,
          product_nm, message, price, expire_dt, hash,
          status, sent_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'PENDING', NOW())`,
        [
          bill_id,
          process.env.PAYMINT_MEMBER || 'TEST-MEMBER-FOR-API',
          process.env.PAYMINT_MERCHANT || 'TEST-MERCHANT-FOR-API',
          member_nm,
          cleanPhone,
          email || null,
          product_nm,
          message || null,
          price,
          '2099-12-31',
          hash
        ]
      );
      
      // 페이민트 API 호출
      const paymintResponse = await sendBill({
        bill_id,
        product_nm,
        message: message || '결제 부탁드립니다',
        member_nm,
        phone: cleanPhone,
        price: cleanPrice,
        expire_dt: '2099-12-31',
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/callback`
      });
      
      // 7. 응답 확인
      if (paymintResponse.code !== '0000') {
        throw new Error(paymintResponse.msg || '청구서 발송 실패');
      }
      
      // 8. short_url 저장
      await client.query(
        'UPDATE payments SET short_url = $1 WHERE bill_id = $2',
        [paymintResponse.shortURL, bill_id]
      );
      
      return {
        bill_id,
        shortURL: paymintResponse.shortURL
      };
    });
    
    console.log('청구서 발송 성공:', result);
    
    // 9. 성공 응답
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('청구서 발송 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '청구서 발송 실패'
      },
      { status: 500 }
    );
  }
}
```

### 4. 환경 변수 (.env.local)

```env
# 페이민트 API
PAYMINT_BASE_URL=http://stg.paymint.co.kr:10200
PAYMINT_API_KEY=TEST-API-KEY-TALK
PAYMINT_MEMBER=TEST-MEMBER-FOR-API
PAYMINT_MERCHANT=TEST-MERCHANT-FOR-API

# NextJS Base URL (콜백 URL용)
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# PostgreSQL
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

---

## 테스트

### curl 테스트

```bash
curl -X POST http://localhost:3000/api/payments/send \
  -H "Content-Type: application/json" \
  -d '{
    "member_nm": "홍길동",
    "phone": "01012345678",
    "email": "hong@example.com",
    "product_nm": "2025년 1월 이용료",
    "message": "결제 부탁드립니다",
    "price": 50000
  }'
```

### 성공 응답

```json
{
  "success": true,
  "data": {
    "bill_id": "1234567890-1730539200000",
    "shortURL": "https://short.paymint.co.kr/abc123"
  }
}
```

### 실패 응답

```json
{
  "success": false,
  "error": "필수 항목이 누락되었습니다"
}
```

### React 컴포넌트에서 호출

```typescript
// app/payments/send/page.tsx
'use client';

import { useState } from 'react';

export default function SendPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      member_nm: formData.get('member_nm') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      product_nm: formData.get('product_nm') as string,
      message: formData.get('message') as string,
      price: parseInt(formData.get('price') as string)
    };
    
    try {
      const response = await fetch('/api/payments/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setResult(result.data);
        alert('청구서 발송 성공!');
      } else {
        alert(`발송 실패: ${result.error}`);
      }
    } catch (error) {
      alert('발송 오류');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">청구서 발송</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            고객명
          </label>
          <input
            type="text"
            name="member_nm"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            전화번호
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="01012345678"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            이메일
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            상품명
          </label>
          <input
            type="text"
            name="product_nm"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            안내메시지
          </label>
          <textarea
            name="message"
            rows={3}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            금액
          </label>
          <input
            type="number"
            name="price"
            required
            min="1000"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '발송 중...' : '청구서 발송'}
        </button>
      </form>
      
      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded">
          <h2 className="font-bold mb-2">발송 완료</h2>
          <p className="text-sm">Bill ID: {result.bill_id}</p>
          <p className="text-sm">
            URL: <a href={result.shortURL} target="_blank" className="text-blue-600 underline">
              {result.shortURL}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
```

---

## 주의사항

### 1. bill_id 중복 방지

타임스탬프를 사용하여 고유성을 보장합니다.

```typescript
// 좋은 예
const bill_id = `${businessNumber}-${Date.now()}`;

// 나쁜 예
const bill_id = `${businessNumber}-1000000001`; // 항상 동일
```

### 2. hash 생성 순서

반드시 정확한 순서로 생성해야 합니다.

```typescript
// 올바른 순서
const hashString = `${bill_id},${phone},${price}`;
```

### 3. 트랜잭션 사용

DB 저장과 API 호출을 트랜잭션으로 묶어 일관성을 보장합니다.

```typescript
await transaction(async (client) => {
  // 1. DB 저장
  await client.query(...)
  
  // 2. API 호출
  const response = await sendBill(...)
  
  // 3. 실패 시 자동 롤백
  if (response.code !== '0000') {
    throw new Error(...)
  }
  
  // 4. short_url 업데이트
  await client.query(...)
});
```

### 4. 에러 처리

모든 에러를 적절하게 처리하고 로깅합니다.

```typescript
try {
  // 처리 로직
} catch (error) {
  console.error('청구서 발송 오류:', error);
  
  return NextResponse.json(
    { success: false, error: error.message },
    { status: 500 }
  );
}
```

---

## 다음 단계

청구서 발송이 구현되었으니 결제 완료 콜백을 처리합니다.

[결제 완료 처리 구현](./nextjs_03_payment_callback.md)

---

## 체크리스트

발송 API 구현 완료 확인:

- [ ] lib/utils.ts 파일 생성
- [ ] lib/paymint.ts 파일 생성
- [ ] app/api/payments/send/route.ts 파일 생성
- [ ] 환경 변수 설정
- [ ] curl 테스트 성공
- [ ] React 컴포넌트 테스트 성공
- [ ] 에러 케이스 테스트
- [ ] 데이터베이스 확인
