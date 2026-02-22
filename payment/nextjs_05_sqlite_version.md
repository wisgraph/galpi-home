# SQLite 버전 구현 가이드

## 목차
1. [개요](#개요)
2. [PostgreSQL vs SQLite 비교](#postgresql-vs-sqlite-비교)
3. [SQLite 데이터베이스 설정](#sqlite-데이터베이스-설정)
4. [주요 차이점](#주요-차이점)
5. [테스트 가이드](#테스트-가이드)
6. [프로덕션 전환](#프로덕션-전환)

---

## 개요

이 문서는 원본 가이드(Supabase PostgreSQL)를 기반으로 **SQLite**를 사용한 간단한 구현 방법을 설명합니다.

### 장점

**SQLite 사용 시**
- 별도의 데이터베이스 서버 불필요
- 설치 및 설정이 매우 간단
- 로컬 개발 및 테스트에 최적
- 파일 기반으로 백업이 쉬움
- 제로 컨피그레이션

**주의사항**
- 동시 접속이 많은 프로덕션 환경에는 부적합
- 분산 시스템에서 사용 불가
- 프로덕션 배포 시 PostgreSQL이나 MySQL로 전환 권장

---

## PostgreSQL vs SQLite 비교

### 연결 방식

**PostgreSQL (원본)**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res;
}
```

**SQLite (이 프로젝트)**
```typescript
import Database from 'better-sqlite3';

let db: Database.Database | null = null;

export function getDatabase() {
  if (!db) {
    db = new Database('payments.db');
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export function query<T = any>(sql: string, params?: any[]): T[] {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  
  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    return stmt.all(params || []) as T[];
  } else {
    const result = stmt.run(params || []);
    return [{ changes: result.changes, lastInsertRowid: result.lastInsertRowid }] as T[];
  }
}
```

### 트랜잭션 처리

**PostgreSQL (원본)**
```typescript
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
```

**SQLite (이 프로젝트)**
```typescript
export function transaction<T>(callback: (db: Database.Database) => T): T {
  const database = getDatabase();
  const savepoint = `sp_${Date.now()}`;
  
  try {
    database.exec(`SAVEPOINT ${savepoint}`);
    const result = callback(database);
    database.exec(`RELEASE ${savepoint}`);
    return result;
  } catch (error) {
    database.exec(`ROLLBACK TO ${savepoint}`);
    throw error;
  }
}
```

### 쿼리 문법 차이

**날짜/시간 처리**

PostgreSQL:
```sql
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

SQLite:
```sql
created_at TEXT NOT NULL DEFAULT (datetime('now'))
```

**자동 증가 ID**

PostgreSQL:
```sql
id BIGSERIAL PRIMARY KEY
```

SQLite:
```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
```

**숫자 타입**

PostgreSQL:
```sql
price NUMERIC(10,0) NOT NULL
```

SQLite:
```sql
price INTEGER NOT NULL
```

---

## SQLite 데이터베이스 설정

### 패키지 설치

```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

### lib/db.ts

```typescript
import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'payments.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(db: Database.Database) {
  // payments 테이블 생성
  db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_id TEXT NOT NULL UNIQUE,
      
      -- 가맹점 정보
      member TEXT NOT NULL,
      merchant TEXT NOT NULL,
      
      -- 고객 정보
      member_nm TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      
      -- 청구 정보
      product_nm TEXT NOT NULL,
      message TEXT,
      price INTEGER NOT NULL,
      
      -- 결제 상태
      status TEXT NOT NULL DEFAULT 'PENDING',
      
      -- 페이민트 정보
      short_url TEXT,
      expire_dt TEXT,
      hash TEXT NOT NULL,
      
      -- 결제 완료 정보
      appr_num TEXT,
      appr_dt TEXT,
      appr_price INTEGER,
      appr_pay_type TEXT,
      appr_issuer TEXT,
      appr_issuer_num TEXT,
      
      -- 취소 정보
      cancel_num TEXT,
      cancel_dt TEXT,
      
      -- 타임스탬프
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      sent_at TEXT,
      paid_at TEXT,
      cancelled_at TEXT,
      
      CHECK(status IN ('PENDING', 'PAID', 'CANCELLED')),
      CHECK(price > 0)
    );
  `);

  // 인덱스 생성
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_payments_phone ON payments(phone);
    CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
    CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
    CREATE INDEX IF NOT EXISTS idx_payments_member_merchant ON payments(member, merchant);
    CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);
  `);

  // updated_at 자동 업데이트 트리거
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_payments_updated_at
    AFTER UPDATE ON payments
    BEGIN
      UPDATE payments SET updated_at = datetime('now')
      WHERE id = NEW.id;
    END;
  `);

  console.log('SQLite 데이터베이스 초기화 완료');
}

// 트랜잭션 헬퍼
export function transaction<T>(callback: (db: Database.Database) => T): T {
  const database = getDatabase();
  const savepoint = `sp_${Date.now()}`;
  
  try {
    database.exec(`SAVEPOINT ${savepoint}`);
    const result = callback(database);
    database.exec(`RELEASE ${savepoint}`);
    return result;
  } catch (error) {
    database.exec(`ROLLBACK TO ${savepoint}`);
    throw error;
  }
}

// 쿼리 헬퍼
export function query<T = any>(sql: string, params?: any[]): T[] {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  
  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    return stmt.all(params || []) as T[];
  } else {
    const result = stmt.run(params || []);
    return [{ changes: result.changes, lastInsertRowid: result.lastInsertRowid }] as T[];
  }
}

// 단일 행 조회
export function queryOne<T = any>(sql: string, params?: any[]): T | null {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  return (stmt.get(params || []) as T) || null;
}

export default getDatabase;
```

---

## 주요 차이점

### 1. API Routes 사용법

**PostgreSQL 버전에서의 변경 필요 없음**

API Routes의 로직은 동일하게 유지됩니다. `lib/db.ts`의 인터페이스가 동일하기 때문에:

```typescript
// app/api/payments/send/route.ts
import { query, transaction } from '@/lib/db';

// 사용법은 동일
const result = transaction((db) => {
  db.prepare('INSERT INTO ...').run(...);
});
```

### 2. 날짜 포맷팅

**SQLite는 날짜를 TEXT로 저장**

조회 시 포맷팅 필요:
```typescript
const payments = query(
  `SELECT 
    bill_id,
    datetime(created_at, 'localtime') as created_at,
    datetime(paid_at, 'localtime') as paid_at
  FROM payments
  WHERE status = ?`,
  ['PAID']
);
```

### 3. 환경 변수

**PostgreSQL 연결 문자열 불필요**

```env
# .env.local

# PostgreSQL (원본) - 불필요
# DATABASE_URL=postgresql://...

# SQLite - 자동 생성
# 별도 설정 불필요 (payments.db 파일로 자동 생성)

# 나머지는 동일
PAYMINT_BASE_URL=http://stg.paymint.co.kr:10200
PAYMINT_API_KEY=TEST-API-KEY-TALK
...
```

---

## 테스트 가이드

### 유닛 테스트 작성

**Jest 설정**

```bash
npm install -D jest @types/jest ts-jest jest-environment-node
```

**jest.config.js**
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

**테스트 예제: lib/utils.test.ts**

```typescript
import { generateBillId, createHash } from '@/lib/utils';

describe('Utils', () => {
  test('generateBillId should be 20 characters', () => {
    const billId = generateBillId();
    expect(billId.length).toBe(20);
    expect(billId).toMatch(/^\d{10}-\d{9}$/);
  });

  test('createHash should create consistent SHA256', () => {
    const hash1 = createHash('test');
    const hash2 = createHash('test');
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64);
  });
});
```

**테스트 실행**

```bash
# 모든 테스트 실행
npm test

# Watch 모드
npm test:watch

# 커버리지 확인
npm test:coverage
```

### bill_id 길이 테스트

**중요: bill_id는 정확히 20자리여야 함**

```typescript
// lib/utils.ts
export function generateBillId(): string {
  const businessNumber = process.env.BUSINESS_NUMBER || '1234567890';
  // 9자리 랜덤 숫자 생성 (10 + 1 + 9 = 20자리)
  const randomDigits = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0');
  return `${businessNumber}-${randomDigits}`;
}

// 테스트
test('bill_id must be exactly 20 characters', () => {
  const billId = generateBillId();
  expect(billId.length).toBe(20);
  // 예: 1234567890-123456789 (10 + 1 + 9 = 20)
});
```

---

## 프로덕션 전환

### SQLite에서 PostgreSQL로 마이그레이션

**1단계: 데이터 백업**

```bash
# SQLite 데이터 덤프
sqlite3 payments.db .dump > backup.sql
```

**2단계: PostgreSQL 설정**

```bash
# Supabase 또는 다른 PostgreSQL 서비스 사용
# Connection string 획득
```

**3단계: lib/db.ts 수정**

원본 가이드의 PostgreSQL 버전으로 교체:

```typescript
import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res;
}

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
```

**4단계: 스키마 마이그레이션**

```sql
-- PostgreSQL 버전 (원본 가이드 참조)
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    bill_id VARCHAR(20) NOT NULL UNIQUE,
    -- ... 나머지 필드
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**5단계: 날짜 쿼리 수정**

```typescript
// SQLite
datetime(created_at, 'localtime')

// PostgreSQL
TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS')
```

### 프로덕션 체크리스트

- [ ] PostgreSQL 또는 MySQL로 전환
- [ ] 데이터베이스 백업 전략 수립
- [ ] 환경 변수 운영 키로 변경
- [ ] HTTPS 적용
- [ ] IP 화이트리스트 설정 (콜백 엔드포인트)
- [ ] 에러 로깅 및 모니터링 설정
- [ ] 로드 테스트 수행
- [ ] 보안 검토 완료

---

## 요약

### SQLite 사용 (개발/테스트)

✅ **장점**
- 빠른 설정
- 로컬 개발 용이
- 테스트 환경 구축 간편

❌ **단점**
- 동시 접속 제한
- 프로덕션에 부적합
- 분산 환경 불가

### PostgreSQL 사용 (프로덕션)

✅ **장점**
- 높은 동시성
- 안정적인 운영
- 확장 가능

❌ **단점**
- 설정이 복잡
- 별도 서버 필요
- 비용 발생

**권장 사항**: 개발 및 테스트는 SQLite, 프로덕션은 PostgreSQL

---

## 다음 단계

- 개발 환경에서 SQLite로 빠르게 프로토타이핑
- 충분한 테스트 후 PostgreSQL로 전환
- 실제 결제 테스트 (테스트 환경)
- 운영 환경 배포

[← 결제 취소](./nextjs_04_cancel_payment.md) | [README로 돌아가기](./README.md)

