# 결제 취소 API (NextJS)

## 목차
1. [API 개요](#api-개요)
2. [페이민트 취소 API 스펙](#페이민트-취소-api-스펙)
3. [구현 파일 구조](#구현-파일-구조)
4. [코드 구현](#코드-구현)
5. [테스트](#테스트)

---

## API 개요

### NextJS API Route 엔드포인트
- URI: `/api/payments/cancel`
- Method: `POST`
- 처리: 서버사이드에서 페이민트 취소 API 호출 및 DB 업데이트

### 페이민트 취소 API 엔드포인트
- URI: `/if/bill/cancel`
- Method: `POST`
- Base URL: `http://stg.paymint.co.kr:10200/` (테스트)

### 처리 흐름

```
[Client]
  |
  v
POST /api/payments/cancel
  |
  v
[API Route Handler]
  |
  +---> 1. 결제 정보 조회 (status = PAID)
  |
  +---> 2. hash 생성 (bill_id + "," + price)
  |
  +---> 3. 페이민트 취소 API 호출
  |
  +---> 4. DB 업데이트 (PAID -> CANCELLED)
  |
  v
[Response to Client]
```

---

## 페이민트 취소 API 스펙

### 요청 파라미터

```typescript
interface PaymintCancelRequest {
  apikey: string;
  member: string;
  merchant: string;
  bill_id: string;
  price: string;    // 원 결제 금액
  hash: string;     // SHA256(bill_id + "," + price)
}
```

### 응답 데이터

```typescript
interface PaymintCancelResponse {
  apikey: string;
  member: string;
  merchant: string;
  bill_id: string;
  hash: string;
  appr_num: string;           // 취소 승인 번호
  appr_origin_num: string;    // 원거래 승인 번호
  appr_cancel_dt: string;     // 취소 일시 (YYYYMMDDHHMMSS)
  code: string;               // "0000": 성공
  msg: string;
}
```

---

## 구현 파일 구조

```
app/
└── api/
    └── payments/
        └── cancel/
            └── route.ts    # 취소 API Route

lib/
├── db.ts                   # PostgreSQL 연결
├── paymint.ts             # 페이민트 API 클라이언트
└── utils.ts               # 유틸리티 함수
```

---

## 코드 구현

### 1. 페이민트 API 클라이언트 업데이트 (lib/paymint.ts)

```typescript
import axios from 'axios';
import { createHash } from './utils';

const PAYMINT_BASE_URL = process.env.PAYMINT_BASE_URL || 'http://stg.paymint.co.kr:10200';
const PAYMINT_API_KEY = process.env.PAYMINT_API_KEY || 'TEST-API-KEY-TALK';
const PAYMINT_MEMBER = process.env.PAYMINT_MEMBER || 'TEST-MEMBER-FOR-API';
const PAYMINT_MERCHANT = process.env.PAYMINT_MERCHANT || 'TEST-MERCHANT-FOR-API';

interface PaymintResponse {
  code: string;
  msg: string;
  appr_num?: string;
  appr_origin_num?: string;
  appr_cancel_dt?: string;
}

// 결제 취소
export async function cancelPayment(
  bill_id: string,
  price: number
): Promise<PaymintResponse> {
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
        price: price.toString(),
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

### 2. 취소 API Route (app/api/payments/cancel/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cancelPayment as cancelPaymintPayment } from '@/lib/paymint';

// POST /api/payments/cancel
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 데이터 파싱
    const body = await request.json();
    const { bill_id } = body;
    
    // 2. 유효성 검사
    if (!bill_id) {
      return NextResponse.json(
        { success: false, error: 'bill_id가 필요합니다' },
        { status: 400 }
      );
    }
    
    // 3. 결제 정보 조회
    const result = await query(
      `SELECT 
        bill_id, 
        price, 
        status,
        appr_num
      FROM payments 
      WHERE bill_id = $1`,
      [bill_id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: '청구서를 찾을 수 없습니다' },
        { status: 404 }
      );
    }
    
    const payment = result.rows[0];
    
    // 4. 상태 확인
    if (payment.status !== 'PAID') {
      return NextResponse.json(
        { 
          success: false, 
          error: `취소 가능한 상태가 아닙니다 (현재 상태: ${payment.status})` 
        },
        { status: 400 }
      );
    }
    
    console.log('결제 정보 조회:', payment);
    
    // 5. 페이민트 취소 API 호출
    const cancelResponse = await cancelPaymintPayment(
      payment.bill_id,
      payment.price
    );
    
    // 6. 취소 응답 확인
    if (cancelResponse.code !== '0000') {
      throw new Error(cancelResponse.msg || '취소 실패');
    }
    
    console.log('페이민트 취소 성공:', cancelResponse);
    
    // 7. DB 업데이트
    await query(
      `UPDATE payments 
      SET 
        status = 'CANCELLED',
        cancel_num = $1,
        cancel_dt = $2,
        cancelled_at = NOW()
      WHERE bill_id = $3`,
      [
        cancelResponse.appr_num,
        cancelResponse.appr_cancel_dt,
        bill_id
      ]
    );
    
    console.log('DB 업데이트 완료');
    
    // 8. 성공 응답
    return NextResponse.json({
      success: true,
      data: {
        bill_id: payment.bill_id,
        cancel_num: cancelResponse.appr_num,
        cancel_dt: cancelResponse.appr_cancel_dt
      }
    });
    
  } catch (error) {
    console.error('결제 취소 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '결제 취소 실패'
      },
      { status: 500 }
    );
  }
}
```

---

## 테스트

### curl 테스트

```bash
curl -X POST http://localhost:3000/api/payments/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "bill_id": "1234567890-1730539200000"
  }'
```

### 성공 응답

```json
{
  "success": true,
  "data": {
    "bill_id": "1234567890-1730539200000",
    "cancel_num": "87654321",
    "cancel_dt": "20251102153000"
  }
}
```

### 실패 응답 (이미 취소됨)

```json
{
  "success": false,
  "error": "취소 가능한 상태가 아닙니다 (현재 상태: CANCELLED)"
}
```

### 실패 응답 (청구서 없음)

```json
{
  "success": false,
  "error": "청구서를 찾을 수 없습니다"
}
```

### React 컴포넌트 (취소 버튼)

```typescript
// app/payments/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentDetailProps {
  payment: {
    bill_id: string;
    member_nm: string;
    product_nm: string;
    price: number;
    status: string;
    appr_num?: string;
    paid_at?: string;
  };
}

export default function PaymentDetail({ payment }: PaymentDetailProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  async function handleCancel() {
    if (!confirm('정말 취소하시겠습니까?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/payments/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bill_id: payment.bill_id })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('결제가 취소되었습니다');
        router.refresh(); // 페이지 새로고침
      } else {
        alert(`취소 실패: ${result.error}`);
      }
    } catch (error) {
      alert('취소 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">결제 상세</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">청구서 ID</p>
            <p className="font-medium">{payment.bill_id}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">고객명</p>
            <p className="font-medium">{payment.member_nm}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">상품명</p>
            <p className="font-medium">{payment.product_nm}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">금액</p>
            <p className="font-medium">{payment.price.toLocaleString()}원</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">상태</p>
            <p className="font-medium">
              <span className={`px-2 py-1 rounded text-sm ${
                payment.status === 'PAID' ? 'bg-green-100 text-green-800' :
                payment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {payment.status === 'PAID' ? '결제완료' :
                 payment.status === 'CANCELLED' ? '취소' : '대기중'}
              </span>
            </p>
          </div>
          
          {payment.appr_num && (
            <div>
              <p className="text-sm text-gray-500">승인번호</p>
              <p className="font-medium">{payment.appr_num}</p>
            </div>
          )}
          
          {payment.paid_at && (
            <div>
              <p className="text-sm text-gray-500">결제일시</p>
              <p className="font-medium">{payment.paid_at}</p>
            </div>
          )}
        </div>
        
        {payment.status === 'PAID' && (
          <div className="pt-4 border-t">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? '취소 처리 중...' : '결제 취소'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 취소 관리 API (목록 조회)

### app/api/payments/list/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // PENDING, PAID, CANCELLED
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let sql = `
      SELECT 
        bill_id,
        member_nm,
        phone,
        email,
        product_nm,
        price,
        status,
        appr_num,
        TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_date,
        TO_CHAR(paid_at, 'YYYY-MM-DD HH24:MI:SS') as paid_date,
        TO_CHAR(cancelled_at, 'YYYY-MM-DD HH24:MI:SS') as cancelled_date
      FROM payments
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }
    
    sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await query(sql, params);
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        limit,
        offset,
        total: result.rowCount
      }
    });
    
  } catch (error) {
    console.error('목록 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '목록 조회 실패' },
      { status: 500 }
    );
  }
}
```

### 사용 예제

```typescript
// 결제 완료 건만 조회
const response = await fetch('/api/payments/list?status=PAID&limit=50');
const result = await response.json();

// 취소 내역 조회
const cancelResponse = await fetch('/api/payments/list?status=CANCELLED');
const cancelResult = await cancelResponse.json();
```

---

## 주의사항

### 1. hash 생성 차이

발송 시와 취소 시 hash 생성 방법이 다릅니다.

**발송 시**
```typescript
const hashString = `${bill_id},${phone},${price}`;
```

**취소 시**
```typescript
const hashString = `${bill_id},${price}`;
```

### 2. 상태 확인 필수

반드시 PAID 상태인 건만 취소할 수 있습니다.

```typescript
if (payment.status !== 'PAID') {
  return NextResponse.json({
    success: false,
    error: '취소 가능한 상태가 아닙니다'
  }, { status: 400 });
}
```

### 3. 원 결제 금액 사용

취소 시 요청하는 금액은 DB에 저장된 원 결제 금액을 사용합니다.

```typescript
const payment = await query(
  'SELECT price FROM payments WHERE bill_id = $1',
  [bill_id]
);

// 이 금액으로 취소 요청
await cancelPaymintPayment(bill_id, payment.rows[0].price);
```

### 4. 부분 취소 불가

결제선생 API는 부분 취소를 지원하지 않습니다.
전액 취소만 가능합니다.

### 5. 취소 콜백 처리

취소가 완료되면 페이민트에서 콜백도 전송합니다.
이미 DB를 업데이트했더라도 콜백 핸들러가 정상 동작해야 합니다.

```typescript
// callback/route.ts에서
if (appr_state === 'C') {
  // 이미 CANCELLED 상태여도 에러 없이 처리
  await client.query(
    `UPDATE payments 
    SET status = 'CANCELLED', cancel_num = $1, cancel_dt = $2
    WHERE bill_id = $3 AND status IN ('PENDING', 'PAID')`,
    [appr_num, appr_dt, bill_id]
  );
}
```

### 6. 에러 처리

다양한 에러 케이스를 처리합니다.

```typescript
try {
  // 취소 로직
} catch (error) {
  // 9970: 이미 취소됨
  // 9980: 청구서 없음
  // 기타 에러
  
  console.error('취소 오류:', error);
  return NextResponse.json({
    success: false,
    error: error.message
  }, { status: 500 });
}
```

---

## 전체 연동 완료

축하합니다! 결제선생 API의 핵심 기능을 모두 구현했습니다.

**구현 완료 항목**
1. 데이터베이스 설계 (PostgreSQL)
2. 청구서 발송 API
3. 결제 완료 콜백 처리
4. 결제 취소 API

**추가 가능한 기능**
- 결제 상태 조회 API
- 대시보드 UI
- 자동결제 기능
- 현금영수증 발급
- 알림 기능 (이메일, SMS)
- 엑셀 다운로드
- 통계 차트

---

## 체크리스트

취소 API 구현 완료 확인:

- [ ] lib/paymint.ts에 cancelPayment 함수 추가
- [ ] app/api/payments/cancel/route.ts 파일 생성
- [ ] 상태 확인 로직 구현
- [ ] hash 생성 (bill_id + price)
- [ ] 에러 처리 구현
- [ ] curl 테스트 성공
- [ ] React 컴포넌트 테스트
- [ ] 취소 콜백 처리 확인
- [ ] 데이터베이스 업데이트 확인

---

## 전체 프로젝트 구조

```
project/
├── app/
│   ├── api/
│   │   └── payments/
│   │       ├── send/
│   │       │   └── route.ts         # 청구서 발송
│   │       ├── callback/
│   │       │   └── route.ts         # 결제 완료 콜백
│   │       ├── cancel/
│   │       │   └── route.ts         # 결제 취소
│   │       ├── list/
│   │       │   └── route.ts         # 결제 목록
│   │       └── [id]/
│   │           └── route.ts         # 결제 상세
│   │
│   ├── payments/
│   │   ├── page.tsx                 # 결제 목록 페이지
│   │   ├── send/
│   │   │   └── page.tsx             # 청구서 발송 페이지
│   │   └── [id]/
│   │       └── page.tsx             # 결제 상세 페이지
│   │
│   └── layout.tsx
│
├── lib/
│   ├── db.ts                        # PostgreSQL 연결
│   ├── paymint.ts                   # 페이민트 API 클라이언트
│   └── utils.ts                     # 유틸리티 함수
│
├── types/
│   └── payment.ts                   # 타입 정의
│
├── .env.local                       # 환경 변수
└── package.json
```

모든 구현이 완료되었습니다!
