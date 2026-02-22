# 결제선생 API 연동 가이드 (NextJS + Supabase)

## 목차
1. [기술 스택](#기술-스택)
2. [API 키 관리](#api-키-관리)
3. [시스템 구조](#시스템-구조)
4. [연동 흐름](#연동-흐름)
5. [프로젝트 구조](#프로젝트-구조)

---

## 기술 스택

### Frontend
- NextJS 14+ (App Router)
- React Server Components
- TypeScript

### Backend
- NextJS API Routes
- PostgreSQL Direct Connection (pg library)
- Supabase (Database Only)

### Database
- Supabase PostgreSQL
- Direct Connection (트랜잭션 처리용)

### 주요 원칙
- 트랜잭션이 필요한 결제 로직은 서버단에서 PostgreSQL client로 직접 처리
- Supabase는 데이터베이스로만 사용 (Procedure 사용 안 함)
- 모든 민감한 API 호출은 API Routes에서 처리

---

## API 키 관리

### 테스트 환경
개발 및 테스트 단계에서 사용하는 환경입니다.

**환경 변수 (.env.local)**
```env
# 페이민트 테스트 환경
PAYMINT_BASE_URL=http://stg.paymint.co.kr:10200
PAYMINT_API_KEY=TEST-API-KEY-TALK
PAYMINT_MEMBER=TEST-MEMBER-FOR-API
PAYMINT_MERCHANT=TEST-MERCHANT-FOR-API

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# PostgreSQL Direct Connection (트랜잭션용)
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

**주의사항**
- 테스트 환경에서는 현대카드만 사용 가능
- 신용카드 테스트는 20,000원 이상
- bill_id는 "사업자번호-10자리" 형식 사용
- 취소 테스트 필수

### 운영 환경
실제 서비스에서 사용하는 환경입니다.

**환경 변수 (.env.production)**
```env
# 페이민트 운영 환경
PAYMINT_BASE_URL=별도제공
PAYMINT_API_KEY=별도제공
PAYMINT_MEMBER=별도제공
PAYMINT_MERCHANT=별도제공

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# PostgreSQL Direct Connection
DATABASE_URL=your_production_database_url
```

**주의사항**
- 운영 환경에서는 bill_id를 20자리 자유롭게 사용 가능
- 모든 카드사 사용 가능
- 실제 결제가 발생하므로 신중하게 테스트

---

## 시스템 구조

### 아키텍처 다이어그램

```
[고객 브라우저]
    |
    v
[NextJS Frontend]
    |
    v
[NextJS API Routes]
    |
    +---> [페이민트 API]
    |
    +---> [PostgreSQL Client] --> [Supabase Database]
```

### 레이어별 역할

**1. Frontend Layer (Client Components)**
- 사용자 UI 렌더링
- 폼 입력 처리
- API Routes 호출
- 결제 상태 표시

**2. API Routes Layer (Server)**
- 페이민트 API 호출
- 데이터베이스 트랜잭션 처리
- 비즈니스 로직 실행
- 에러 처리

**3. Database Layer**
- Supabase PostgreSQL
- Direct Connection으로 트랜잭션 처리
- 결제 데이터 저장

---

## 연동 흐름

### 1단계: 청구서 발송

```
[Client] 
  --> POST /api/payments/send
    --> [API Route]
      --> DB에 청구서 저장
      --> 페이민트 API 호출
      --> shortURL 받아서 DB 업데이트
    <-- 결과 반환
  <-- 응답
```

### 2단계: 결제 완료 (Webhook)

```
[페이민트] 
  --> POST /api/payments/callback
    --> [API Route]
      --> PostgreSQL Transaction 시작
      --> 중복 확인
      --> DB 업데이트 (PENDING -> PAID)
      --> Transaction Commit
    <-- 성공 응답
```

### 3단계: 결제 취소

```
[Client]
  --> POST /api/payments/cancel
    --> [API Route]
      --> DB에서 결제 정보 조회
      --> 페이민트 취소 API 호출
      --> DB 업데이트 (PAID -> CANCELLED)
    <-- 결과 반환
  <-- 응답
```

---

## 프로젝트 구조

### 디렉토리 구조

```
project/
├── app/
│   ├── api/
│   │   └── payments/
│   │       ├── send/
│   │       │   └── route.ts          # 청구서 발송 API
│   │       ├── callback/
│   │       │   └── route.ts          # 결제 완료 웹훅
│   │       └── cancel/
│   │           └── route.ts          # 결제 취소 API
│   │
│   ├── payments/
│   │   ├── page.tsx                  # 결제 목록
│   │   └── [id]/
│   │       └── page.tsx              # 결제 상세
│   │
│   └── layout.tsx
│
├── lib/
│   ├── db.ts                         # PostgreSQL 연결
│   ├── paymint.ts                    # 페이민트 API 클라이언트
│   └── utils.ts                      # 유틸리티 함수
│
├── types/
│   └── payment.ts                    # 타입 정의
│
├── .env.local                        # 환경 변수
└── package.json
```

### 주요 파일 설명

**lib/db.ts**
- PostgreSQL Direct Connection 설정
- 트랜잭션 헬퍼 함수
- 연결 풀 관리

**lib/paymint.ts**
- 페이민트 API 호출 래퍼
- hash 생성 유틸리티
- API 응답 타입 정의

**app/api/payments/\*/route.ts**
- NextJS API Routes
- 서버사이드 로직 처리
- 데이터베이스 트랜잭션

---

## 보안 고려사항

### 1. 환경 변수 관리

**절대 노출 금지**
- PAYMINT_API_KEY
- SUPABASE_SERVICE_ROLE_KEY
- DATABASE_URL

**클라이언트 노출 가능**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

### 2. API Routes 보호

```typescript
// middleware로 인증 확인
export async function middleware(request: NextRequest) {
  // 사용자 인증 확인
  // IP 화이트리스트 확인 (콜백용)
}
```

### 3. 데이터베이스 접근

- Supabase Service Role Key는 서버에서만 사용
- PostgreSQL Direct Connection은 API Routes에서만 사용
- Row Level Security (RLS) 활성화

---

## 개발 순서

### Phase 1: 환경 설정
1. NextJS 프로젝트 생성
2. Supabase 프로젝트 생성
3. 환경 변수 설정
4. PostgreSQL 연결 테스트

### Phase 2: 데이터베이스
1. payments 테이블 생성
2. 인덱스 설정
3. 연결 테스트

### Phase 3: API 구현
1. 청구서 발송 API
2. 결제 완료 콜백 API
3. 결제 취소 API

### Phase 4: 프론트엔드
1. 결제 목록 페이지
2. 청구서 발송 폼
3. 결제 상태 표시

### Phase 5: 테스트
1. 단위 테스트
2. 통합 테스트
3. 운영 전 최종 테스트

---

## 다음 단계

이제 각 단계별로 구현을 시작합니다.

1. [데이터베이스 설계](./nextjs_01_database.md)
2. [청구서 발송 구현](./nextjs_02_send_bill.md)
3. [결제 완료 처리 구현](./nextjs_03_payment_callback.md)
4. [결제 취소 구현](./nextjs_04_cancel_payment.md)

---

## 체크리스트

시작 전 확인 사항:

- [ ] NextJS 14+ 프로젝트 생성
- [ ] Supabase 프로젝트 생성
- [ ] 환경 변수 설정 완료
- [ ] PostgreSQL 연결 테스트 완료
- [ ] 페이민트 테스트 계정 발급
- [ ] TypeScript 설정 완료
