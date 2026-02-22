# 결제 완료 콜백 처리 (NextJS)

## 목차
1. [콜백 개요](#콜백-개요)
2. [페이민트 콜백 스펙](#페이민트-콜백-스펙)
3. [구현 파일 구조](#구현-파일-구조)
4. [코드 구현](#코드-구현)
5. [테스트](#테스트)

---

## 콜백 개요

### NextJS API Route 엔드포인트
- URI: `/api/payments/callback`
- Method: `POST`
- 호출자: 페이민트 서버

### 처리 흐름

```
[페이민트 서버]
  |
  v
POST /api/payments/callback
  |
  v
[API Route Handler]
  |
  +---> 1. 콜백 데이터 수신
  |
  +---> 2. PostgreSQL Transaction 시작
  |
  +---> 3. 중복 확인 (status = PENDING)
  |
  +---> 4. DB 업데이트 (PENDING -> PAID/CANCELLED)
  |
  +---> 5. Transaction Commit
  |
  v
[Response to 페이민트]
```

---

## 페이민트 콜백 스펙

### 수신 데이터 (결제 완료 시)

```typescript
interface PaymentCallback {
  apikey: string;
  bill_id: string;
  appr_state: 'F' | 'C' | 'D';  // F:완료, C:취소, D:파기
  appr_pay_type?: string;       // 결제수단
  appr_dt?: string;             // 승인일시 (YYYYMMDDHHMMSS)
  appr_price?: string;          // 승인금액
  appr_issuer?: string;         // 카드사/은행명
  appr_issuer_cd?: string;      // 발행코드
  appr_issuer_num?: string;     // 카드번호/계좌번호 (마스킹)
  appr_acquirer_cd?: string;    // 매입사코드
  appr_acquirer_nm?: string;    // 매입사명
  appr_num?: string;            // 승인번호
  appr_monthly?: string;        // 할부개월수
}
```

### 응답 데이터

```typescript
interface CallbackResponse {
  apikey: string;
  member: string;
  merchant: string;
  bill_id: string;
  code: string;  // "0000": 성공, "9999": 실패
  msg: string;
}
```

---

## 구현 파일 구조

```
app/
└── api/
    └── payments/
        └── callback/
            └── route.ts    # 콜백 핸들러

lib/
├── db.ts                   # PostgreSQL 연결
└── utils.ts                # 유틸리티 함수
```

---

## 코드 구현

### 1. 콜백 핸들러 (app/api/payments/callback/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { transaction } from '@/lib/db';

const PAYMINT_MEMBER = process.env.PAYMINT_MEMBER || 'TEST-MEMBER-FOR-API';
const PAYMINT_MERCHANT = process.env.PAYMINT_MERCHANT || 'TEST-MERCHANT-FOR-API';

// POST /api/payments/callback
export async function POST(request: NextRequest) {
  try {
    // 1. 콜백 데이터 수신
    const body = await request.json();
    const {
      apikey,
      bill_id,
      appr_state,
      appr_pay_type,
      appr_dt,
      appr_price,
      appr_issuer,
      appr_issuer_num,
      appr_num,
      appr_monthly
    } = body;
    
    console.log('===== 콜백 수신 =====');
    console.log('시각:', new Date().toISOString());
    console.log('청구서 ID:', bill_id);
    console.log('결제 상태:', appr_state);
    console.log('승인 번호:', appr_num);
    
    // 2. 필수 필드 검증
    if (!bill_id || !appr_state) {
      console.error('필수 필드 누락');
      return NextResponse.json({
        apikey: apikey || '',
        member: PAYMINT_MEMBER,
        merchant: PAYMINT_MERCHANT,
        bill_id: bill_id || '',
        code: '9999',
        msg: '필수 필드 누락'
      });
    }
    
    // 3. 트랜잭션으로 처리
    await transaction(async (client) => {
      if (appr_state === 'F') {
        // 결제 완료 처리
        
        // 중복 확인
        const checkResult = await client.query(
          'SELECT id, status FROM payments WHERE bill_id = $1',
          [bill_id]
        );
        
        if (checkResult.rows.length === 0) {
          throw new Error('청구서를 찾을 수 없습니다');
        }
        
        if (checkResult.rows[0].status !== 'PENDING') {
          console.log('중복 콜백 또는 이미 처리됨:', checkResult.rows[0].status);
          return; // 트랜잭션 종료 (에러 없음)
        }
        
        // 결제 완료 업데이트
        const updateResult = await client.query(
          `UPDATE payments 
          SET 
            status = 'PAID',
            appr_num = $1,
            appr_dt = $2,
            appr_price = $3,
            appr_pay_type = $4,
            appr_issuer = $5,
            appr_issuer_num = $6,
            paid_at = NOW()
          WHERE bill_id = $7 AND status = 'PENDING'
          RETURNING id`,
          [
            appr_num,
            appr_dt,
            appr_price ? parseInt(appr_price) : null,
            appr_pay_type,
            appr_issuer,
            appr_issuer_num,
            bill_id
          ]
        );
        
        if (updateResult.rowCount > 0) {
          console.log('결제 완료 처리 성공');
        }
        
      } else if (appr_state === 'C') {
        // 결제 취소 처리
        
        await client.query(
          `UPDATE payments 
          SET 
            status = 'CANCELLED',
            cancel_num = $1,
            cancel_dt = $2,
            cancelled_at = NOW()
          WHERE bill_id = $3 AND status IN ('PENDING', 'PAID')`,
          [appr_num, appr_dt, bill_id]
        );
        
        console.log('결제 취소 처리 완료');
        
      } else if (appr_state === 'D') {
        // 청구서 파기 처리
        
        await client.query(
          `UPDATE payments 
          SET 
            status = 'CANCELLED',
            cancelled_at = NOW()
          WHERE bill_id = $1 AND status = 'PENDING'`,
          [bill_id]
        );
        
        console.log('청구서 파기 처리 완료');
      }
    });
    
    // 4. 성공 응답
    return NextResponse.json({
      apikey: apikey,
      member: PAYMINT_MEMBER,
      merchant: PAYMINT_MERCHANT,
      bill_id: bill_id,
      code: '0000',
      msg: '성공하였습니다.'
    });
    
  } catch (error) {
    // 5. 에러 처리
    console.error('콜백 처리 오류:', error);
    
    const body = await request.json().catch(() => ({}));
    
    return NextResponse.json({
      apikey: body.apikey || '',
      member: PAYMINT_MEMBER,
      merchant: PAYMINT_MERCHANT,
      bill_id: body.bill_id || '',
      code: '9999',
      msg: '처리 중에 오류가 발생했습니다.'
    });
  }
}
```

### 2. 환경 변수 (.env.local)

```env
# 페이민트 API
PAYMINT_API_KEY=TEST-API-KEY-TALK
PAYMINT_MEMBER=TEST-MEMBER-FOR-API
PAYMINT_MERCHANT=TEST-MERCHANT-FOR-API

# NextJS Base URL (콜백 URL)
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# PostgreSQL
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

### 3. IP 화이트리스트 미들웨어 (선택사항)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 페이민트 서버 IP (실제 IP로 변경 필요)
const ALLOWED_IPS = [
  '페이민트서버IP1',
  '페이민트서버IP2',
  '127.0.0.1', // 로컬 테스트용
];

export function middleware(request: NextRequest) {
  // 콜백 엔드포인트만 IP 체크
  if (request.nextUrl.pathname === '/api/payments/callback') {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!ALLOWED_IPS.includes(ip)) {
      console.warn('차단된 IP:', ip);
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/payments/:path*',
};
```

---

## 테스트

### curl 테스트 (결제 완료)

```bash
curl -X POST http://localhost:3000/api/payments/callback \
  -H "Content-Type: application/json" \
  -d '{
    "apikey": "TEST-API-KEY-TALK",
    "bill_id": "1234567890-1730539200000",
    "appr_state": "F",
    "appr_num": "12345678",
    "appr_dt": "20251102143000",
    "appr_price": "50000",
    "appr_pay_type": "CARD_PG",
    "appr_issuer": "신한카드",
    "appr_issuer_num": "1234-****-****-5678",
    "appr_monthly": "0"
  }'
```

### 성공 응답

```json
{
  "apikey": "TEST-API-KEY-TALK",
  "member": "TEST-MEMBER-FOR-API",
  "merchant": "TEST-MERCHANT-FOR-API",
  "bill_id": "1234567890-1730539200000",
  "code": "0000",
  "msg": "성공하였습니다."
}
```

### curl 테스트 (결제 취소)

```bash
curl -X POST http://localhost:3000/api/payments/callback \
  -H "Content-Type: application/json" \
  -d '{
    "apikey": "TEST-API-KEY-TALK",
    "bill_id": "1234567890-1730539200000",
    "appr_state": "C",
    "appr_num": "87654321",
    "appr_dt": "20251102153000"
  }'
```

### 데이터베이스 확인

```sql
-- 결제 완료 확인
SELECT 
  bill_id,
  status,
  appr_num,
  appr_price,
  appr_pay_type,
  paid_at
FROM payments
WHERE bill_id = '1234567890-1730539200000';
```

---

## 로깅 강화 (선택사항)

### 콜백 로그 테이블 생성

```sql
CREATE TABLE callback_logs (
  id BIGSERIAL PRIMARY KEY,
  bill_id VARCHAR(20) NOT NULL,
  request_body JSONB NOT NULL,
  response_code VARCHAR(10),
  response_msg VARCHAR(200),
  is_processed BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_callback_logs_bill_id ON callback_logs(bill_id);
CREATE INDEX idx_callback_logs_created_at ON callback_logs(created_at DESC);
```

### 로깅 추가

```typescript
// app/api/payments/callback/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  const startTime = Date.now();
  
  try {
    // 콜백 로그 저장
    await query(
      `INSERT INTO callback_logs (bill_id, request_body, is_processed)
       VALUES ($1, $2, FALSE)`,
      [body.bill_id, JSON.stringify(body)]
    );
    
    // 결제 처리 로직...
    
    // 성공 로그 업데이트
    await query(
      `UPDATE callback_logs 
       SET is_processed = TRUE, response_code = $1, response_msg = $2
       WHERE bill_id = $3 AND created_at > NOW() - INTERVAL '1 minute'`,
      ['0000', '성공하였습니다.', body.bill_id]
    );
    
    console.log(`처리 시간: ${Date.now() - startTime}ms`);
    
    // 응답 반환...
    
  } catch (error) {
    // 실패 로그 저장
    await query(
      `UPDATE callback_logs 
       SET error_message = $1
       WHERE bill_id = $2 AND created_at > NOW() - INTERVAL '1 minute'`,
      [error.message, body.bill_id]
    );
    
    // 에러 처리...
  }
}
```

---

## 주의사항

### 1. 중복 콜백 처리

페이민트는 응답을 받지 못하면 재전송할 수 있습니다.

```typescript
// 중복 방지 조건
WHERE bill_id = $1 AND status = 'PENDING'

// 이미 처리된 경우
if (checkResult.rows[0].status !== 'PENDING') {
  console.log('중복 콜백');
  return; // 에러 없이 종료
}
```

### 2. 트랜잭션 필수

모든 DB 업데이트는 트랜잭션으로 처리합니다.

```typescript
await transaction(async (client) => {
  // 1. 중복 확인
  // 2. 업데이트
  // 3. 에러 시 자동 롤백
});
```

### 3. 빠른 응답

타임아웃을 방지하기 위해 빠르게 응답해야 합니다.

```typescript
// 좋은 예: 즉시 응답
await updateDatabase();
return NextResponse.json({ code: '0000' });

// 나쁜 예: 느린 작업
await updateDatabase();
await sendEmail(); // 시간 소요
await notifySlack(); // 시간 소요
return NextResponse.json({ code: '0000' });
```

### 4. 에러 응답 형식

에러 시에도 반드시 JSON 형식으로 응답합니다.

```typescript
// 항상 JSON 응답
return NextResponse.json({
  apikey: body.apikey || '',
  member: PAYMINT_MEMBER,
  merchant: PAYMINT_MERCHANT,
  bill_id: body.bill_id || '',
  code: '9999',
  msg: '에러 메시지'
});
```

### 5. 로컬 테스트 (ngrok)

로컬 환경에서 테스트하려면 ngrok을 사용합니다.

```bash
# ngrok 실행
ngrok http 3000

# 생성된 URL
https://abc123.ngrok.io

# 청구서 발송 시 callbackURL 설정
callbackURL: 'https://abc123.ngrok.io/api/payments/callback'
```

---

## 결제 상태 조회 API (추가)

### app/api/payments/[id]/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bill_id = params.id;
    
    const result = await query(
      `SELECT 
        bill_id,
        member_nm,
        phone,
        email,
        product_nm,
        price,
        status,
        appr_num,
        appr_dt,
        appr_price,
        appr_pay_type,
        appr_issuer,
        short_url,
        TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_date,
        TO_CHAR(paid_at, 'YYYY-MM-DD HH24:MI:SS') as paid_date
      FROM payments
      WHERE bill_id = $1`,
      [bill_id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: '청구서를 찾을 수 없습니다' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '조회 실패' },
      { status: 500 }
    );
  }
}
```

### 사용 예제

```typescript
// 클라이언트에서 호출
const response = await fetch(`/api/payments/${bill_id}`);
const result = await response.json();

if (result.success) {
  console.log('결제 정보:', result.data);
}
```

---

## 다음 단계

콜백 처리가 구현되었으니 결제 취소 기능을 구현합니다.

[결제 취소 구현](./nextjs_04_cancel_payment.md)

---

## 체크리스트

콜백 API 구현 완료 확인:

- [ ] app/api/payments/callback/route.ts 파일 생성
- [ ] 트랜잭션 처리 구현
- [ ] 중복 방지 로직 구현
- [ ] 에러 처리 구현
- [ ] curl 테스트 성공
- [ ] 데이터베이스 업데이트 확인
- [ ] ngrok 설정 (로컬 테스트)
- [ ] IP 화이트리스트 설정 (선택)
- [ ] 로깅 구현 (선택)
