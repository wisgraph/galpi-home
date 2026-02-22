# 데이터베이스 설계 (PostgreSQL)

## 목차
1. [테이블 구조](#테이블-구조)
2. [필드 설명](#필드-설명)
3. [인덱스 설계](#인덱스-설계)
4. [테이블 생성 SQL](#테이블-생성-sql)
5. [PostgreSQL 연결 설정](#postgresql-연결-설정)

---

## 테이블 구조

결제 정보를 관리하는 단일 테이블로 설계합니다.

### payments 테이블 개요

이 테이블은 다음 정보를 저장합니다:
- 청구서 기본 정보 (bill_id, 금액, 상품명 등)
- 고객 정보 (이름, 전화번호, 이메일)
- 결제 상태 (PENDING, PAID, CANCELLED)
- 결제 완료 정보 (승인번호, 결제수단 등)
- 취소 정보 (취소번호, 취소일시 등)

---

## 필드 설명

### 기본 정보 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| id | BIGSERIAL | O | 자동증가 Primary Key |
| bill_id | VARCHAR(20) | O | 청구서 고유 ID (UNIQUE) |

### 가맹점 정보 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| member | VARCHAR(30) | O | 가맹점 사용자 코드 |
| merchant | VARCHAR(30) | O | 가맹점 매장 코드 |

### 고객 정보 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| member_nm | VARCHAR(30) | O | 고객 이름 |
| phone | VARCHAR(20) | O | 휴대폰 번호 (하이픈 제거) |
| email | VARCHAR(100) | X | 이메일 주소 |

### 청구 정보 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| product_nm | VARCHAR(100) | O | 상품명 또는 청구 사유 |
| message | TEXT | X | 고객에게 전달할 안내 메시지 |
| price | NUMERIC(10,0) | O | 청구 금액 |

### 결제 상태 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| status | VARCHAR(20) | O | PENDING, PAID, CANCELLED |

**상태 변화 흐름**
```
PENDING (청구서 발송 완료)
   |
   v
PAID (결제 완료)
   |
   v
CANCELLED (결제 취소)
```

### 페이민트 연동 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| short_url | TEXT | X | 페이민트가 생성한 청구서 URL |
| expire_dt | DATE | X | 청구서 유효 기간 |
| hash | VARCHAR(64) | O | SHA256 해시값 |

### 결제 완료 정보 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| appr_num | VARCHAR(50) | X | 승인 번호 |
| appr_dt | VARCHAR(14) | X | 승인 일시 (YYYYMMDDHHMMSS) |
| appr_price | NUMERIC(10,0) | X | 실제 결제 금액 |
| appr_pay_type | VARCHAR(20) | X | 결제 수단 코드 |
| appr_issuer | VARCHAR(50) | X | 카드사명 또는 은행명 |
| appr_issuer_num | VARCHAR(50) | X | 카드번호/계좌번호 (마스킹) |

### 취소 정보 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| cancel_num | VARCHAR(50) | X | 취소 승인 번호 |
| cancel_dt | VARCHAR(14) | X | 취소 일시 (YYYYMMDDHHMMSS) |

### 타임스탬프 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| created_at | TIMESTAMPTZ | O | 레코드 생성 일시 (기본값: now()) |
| updated_at | TIMESTAMPTZ | O | 레코드 수정 일시 (자동 업데이트) |
| sent_at | TIMESTAMPTZ | X | 청구서 발송 완료 일시 |
| paid_at | TIMESTAMPTZ | X | 결제 완료 일시 |
| cancelled_at | TIMESTAMPTZ | X | 취소 완료 일시 |

---

## 인덱스 설계

### Primary Key
```sql
PRIMARY KEY (id)
```

### Unique Constraint
```sql
UNIQUE (bill_id)
```

### 조회 성능 향상을 위한 인덱스
```sql
CREATE INDEX idx_payments_phone ON payments(phone);
CREATE INDEX idx_payments_email ON payments(email);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_member_merchant ON payments(member, merchant);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
```

---

## 테이블 생성 SQL

### Supabase SQL Editor에서 실행

```sql
-- payments 테이블 생성
CREATE TABLE payments (
    -- 기본 정보
    id BIGSERIAL PRIMARY KEY,
    bill_id VARCHAR(20) NOT NULL UNIQUE,
    
    -- 가맹점 정보
    member VARCHAR(30) NOT NULL,
    merchant VARCHAR(30) NOT NULL,
    
    -- 고객 정보
    member_nm VARCHAR(30) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    
    -- 청구 정보
    product_nm VARCHAR(100) NOT NULL,
    message TEXT,
    price NUMERIC(10,0) NOT NULL,
    
    -- 결제 상태
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    
    -- 페이민트 정보
    short_url TEXT,
    expire_dt DATE,
    hash VARCHAR(64) NOT NULL,
    
    -- 결제 완료 정보
    appr_num VARCHAR(50),
    appr_dt VARCHAR(14),
    appr_price NUMERIC(10,0),
    appr_pay_type VARCHAR(20),
    appr_issuer VARCHAR(50),
    appr_issuer_num VARCHAR(50),
    
    -- 취소 정보
    cancel_num VARCHAR(50),
    cancel_dt VARCHAR(14),
    
    -- 타임스탬프
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sent_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    
    -- 제약 조건
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'PAID', 'CANCELLED')),
    CONSTRAINT chk_price CHECK (price > 0)
);

-- 코멘트 추가
COMMENT ON TABLE payments IS '결제 통합 테이블';
COMMENT ON COLUMN payments.bill_id IS '청구서 고유 ID (페이민트 키)';
COMMENT ON COLUMN payments.status IS 'PENDING:대기, PAID:완료, CANCELLED:취소';

-- 인덱스 생성
CREATE INDEX idx_payments_phone ON payments(phone);
CREATE INDEX idx_payments_email ON payments(email);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_member_merchant ON payments(member, merchant);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## PostgreSQL 연결 설정

### 패키지 설치

```bash
npm install pg
npm install -D @types/pg
```

### lib/db.ts

```typescript
import { Pool, PoolClient } from 'pg';

// PostgreSQL 연결 풀 생성
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // 최대 연결 수
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// 연결 테스트
pool.on('connect', () => {
  console.log('PostgreSQL 연결 성공');
});

pool.on('error', (err) => {
  console.error('PostgreSQL 연결 오류:', err);
});

// 단일 쿼리 실행
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Query executed', { text, duration, rows: res.rowCount });
  return res;
}

// 트랜잭션 헬퍼
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// 연결 종료
export async function end() {
  await pool.end();
}

export default pool;
```

### 환경 변수 (.env.local)

```env
# Supabase에서 Connection String 복사
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

---

## 자주 사용하는 쿼리

### 청구서 생성

```typescript
import { query } from '@/lib/db';

const result = await query(
  `INSERT INTO payments (
    bill_id, member, merchant, member_nm, phone, email,
    product_nm, message, price, expire_dt, hash,
    status, sent_at
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'PENDING', NOW())
  RETURNING id, bill_id`,
  [
    bill_id,
    'TEST-MEMBER-FOR-API',
    'TEST-MERCHANT-FOR-API',
    member_nm,
    phone,
    email,
    product_nm,
    message,
    price,
    '2099-12-31',
    hash
  ]
);
```

### 결제 완료 업데이트 (트랜잭션)

```typescript
import { transaction } from '@/lib/db';

await transaction(async (client) => {
  // 중복 확인
  const checkResult = await client.query(
    'SELECT id FROM payments WHERE bill_id = $1 AND status = $2',
    [bill_id, 'PENDING']
  );
  
  if (checkResult.rows.length === 0) {
    throw new Error('이미 처리되었거나 존재하지 않는 청구서입니다');
  }
  
  // 결제 완료 업데이트
  await client.query(
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
    WHERE bill_id = $7 AND status = 'PENDING'`,
    [appr_num, appr_dt, appr_price, appr_pay_type, appr_issuer, appr_issuer_num, bill_id]
  );
});
```

### 결제 취소

```typescript
import { query } from '@/lib/db';

// 결제 정보 조회
const result = await query(
  'SELECT bill_id, price, status FROM payments WHERE bill_id = $1 AND status = $2',
  [bill_id, 'PAID']
);

if (result.rows.length === 0) {
  throw new Error('취소 가능한 결제 건이 없습니다');
}

// 취소 처리
await query(
  `UPDATE payments 
  SET 
    status = 'CANCELLED',
    cancel_num = $1,
    cancel_dt = $2,
    cancelled_at = NOW()
  WHERE bill_id = $3`,
  [cancel_num, cancel_dt, bill_id]
);
```

### 결제 내역 조회

```typescript
import { query } from '@/lib/db';

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
    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_date,
    TO_CHAR(paid_at, 'YYYY-MM-DD HH24:MI:SS') as paid_date
  FROM payments
  WHERE member = $1 AND merchant = $2
  ORDER BY created_at DESC
  LIMIT 100`,
  ['TEST-MEMBER-FOR-API', 'TEST-MERCHANT-FOR-API']
);

return result.rows;
```

---

## Row Level Security (RLS) 설정

Supabase에서 보안을 위해 RLS를 설정합니다.

```sql
-- RLS 활성화
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 정책: 인증된 사용자만 자신의 데이터 조회
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- 정책: Service Role은 모든 접근 가능
CREATE POLICY "Service role can do everything"
  ON payments
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');
```

**주의사항**
- API Routes에서는 Service Role Key 사용
- 클라이언트에서는 RLS 정책에 따라 제한됨

---

## 타입 정의

### types/payment.ts

```typescript
export interface Payment {
  id: number;
  bill_id: string;
  member: string;
  merchant: string;
  member_nm: string;
  phone: string;
  email?: string;
  product_nm: string;
  message?: string;
  price: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  short_url?: string;
  expire_dt?: string;
  hash: string;
  appr_num?: string;
  appr_dt?: string;
  appr_price?: number;
  appr_pay_type?: string;
  appr_issuer?: string;
  appr_issuer_num?: string;
  cancel_num?: string;
  cancel_dt?: string;
  created_at: string;
  updated_at: string;
  sent_at?: string;
  paid_at?: string;
  cancelled_at?: string;
}

export interface CreatePaymentInput {
  member_nm: string;
  phone: string;
  email?: string;
  product_nm: string;
  message?: string;
  price: number;
}
```

---

## 다음 단계

데이터베이스가 준비되었으니 청구서 발송 API를 구현합니다.

[청구서 발송 구현](./nextjs_02_send_bill.md)

---

## 체크리스트

데이터베이스 설정 완료 확인:

- [ ] Supabase 프로젝트 생성
- [ ] payments 테이블 생성
- [ ] 인덱스 생성
- [ ] 트리거 생성 (updated_at)
- [ ] RLS 정책 설정
- [ ] DATABASE_URL 환경 변수 설정
- [ ] pg 패키지 설치
- [ ] lib/db.ts 파일 생성
- [ ] 타입 정의 작성
- [ ] 연결 테스트 완료
