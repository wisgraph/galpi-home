# 결제선생 API 연동 가이드

NextJS와 Supabase를 사용한 결제선생 API 완벽 연동 가이드입니다.

---

## 기술 스택

- Frontend: NextJS 14+ (App Router), TypeScript
- Backend: NextJS API Routes
- Database: Supabase PostgreSQL (Direct Connection)
- Payment: 결제선생(페이민트) API

---

## 문서 목록

### 0. 시작하기
**[전체 개요](./nextjs_00_overview.md)**
- 기술 스택 및 아키텍처 설명
- 테스트/운영 환경 API 키 관리
- 시스템 구조 및 연동 흐름
- 프로젝트 디렉토리 구조
- 환경 변수 설정

### 1. 데이터베이스 설계
**[데이터베이스 설계](./nextjs_01_database.md)**
- PostgreSQL 테이블 구조 (이메일 필드 포함)
- Supabase 설정 방법
- PostgreSQL Direct Connection 설정
- 트랜잭션 헬퍼 함수 구현
- TypeScript 타입 정의
- 자주 사용하는 쿼리 예제

### 2. 청구서 발송
**[청구서 발송 API](./nextjs_02_send_bill.md)**
- NextJS API Route 구현
- 페이민트 API 클라이언트 작성
- hash 생성 유틸리티
- 트랜잭션 처리
- curl 테스트 예제
- React 컴포넌트 예제

### 3. 결제 완료 처리
**[결제 완료 콜백](./nextjs_03_payment_callback.md)**
- 웹훅 엔드포인트 구현
- PostgreSQL 트랜잭션 처리
- 중복 방지 로직
- IP 화이트리스트 설정 (선택)
- ngrok을 이용한 로컬 테스트
- 콜백 로깅 (선택)

### 4. 결제 취소
**[결제 취소 API](./nextjs_04_cancel_payment.md)**
- 취소 API Route 구현
- hash 생성 방법 (발송과 다름)
- 상태 확인 로직
- React 관리 화면 예제
- 전체 프로젝트 구조 정리

### 5. SQLite 버전 (추가)
**[SQLite 버전 구현](./nextjs_05_sqlite_version.md)**
- Supabase 대신 SQLite 사용
- 로컬 개발 및 테스트 최적화
- PostgreSQL vs SQLite 비교
- 유닛 테스트 가이드
- 프로덕션 전환 방법

---

## 빠른 시작

### 1단계: 환경 설정
```bash
# 패키지 설치
npm install pg axios
npm install -D @types/pg

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일 편집
```

### 2단계: 데이터베이스 설정
Supabase SQL Editor에서 테이블 생성 (문서 1 참조)

### 3단계: API 구현
- lib/db.ts 작성
- lib/paymint.ts 작성
- lib/utils.ts 작성
- API Routes 작성 (문서 2, 3, 4 참조)

### 4단계: 테스트
```bash
# 청구서 발송 테스트
curl -X POST http://localhost:3000/api/payments/send \
  -H "Content-Type: application/json" \
  -d '{
    "member_nm": "홍길동",
    "phone": "01012345678",
    "email": "hong@example.com",
    "product_nm": "테스트 상품",
    "price": 50000
  }'
```

---

## 주요 특징

- 이모지 제거, 깔끔한 구성
- 초보자도 이해하기 쉬운 단계별 설명
- 실제 동작하는 코드 예제 제공
- 테스트 가능한 API 키 사용 (TEST-API-KEY-TALK)
- LLM 바이브코딩에 최적화된 구조
- 트랜잭션 처리는 서버단에서만
- Supabase Procedure 사용 안 함

---

## 주의사항

### 테스트 환경
- 테스트 환경에서는 현대카드만 사용 가능
- 신용카드 테스트는 20,000원 이상
- bill_id는 "사업자번호-10자리" 형식
- 취소 테스트 필수

### 운영 환경
- bill_id는 20자리 자유롭게 사용
- 모든 카드사 사용 가능
- 실제 결제 발생하므로 신중하게 테스트

### 보안
- API 키는 환경변수로 관리
- PostgreSQL Direct Connection은 서버에서만 사용
- 콜백 엔드포인트 IP 화이트리스트 권장

---

## 문서 읽는 순서

처음 시작하시는 분은 아래 순서로 문서를 읽으시면 됩니다:

### 프로덕션 환경 (Supabase PostgreSQL)
1. [전체 개요](./nextjs_00_overview.md) - 시스템 이해
2. [데이터베이스 설계](./nextjs_01_database.md) - DB 준비
3. [청구서 발송 API](./nextjs_02_send_bill.md) - 첫 번째 API 구현
4. [결제 완료 콜백](./nextjs_03_payment_callback.md) - 웹훅 구현
5. [결제 취소 API](./nextjs_04_cancel_payment.md) - 취소 기능 구현

### 개발/테스트 환경 (SQLite)
1. [전체 개요](./nextjs_00_overview.md) - 시스템 이해
2. [SQLite 버전 구현](./nextjs_05_sqlite_version.md) - 간편한 로컬 개발
3. [청구서 발송 API](./nextjs_02_send_bill.md) - API 구현 (동일)
4. [결제 완료 콜백](./nextjs_03_payment_callback.md) - 콜백 구현 (동일)
5. [결제 취소 API](./nextjs_04_cancel_payment.md) - 취소 구현 (동일)

**추천**: 빠르게 시작하려면 SQLite 버전으로 먼저 테스트해보세요!

---

## 도움이 필요하신가요?

각 문서에는 curl 테스트 예제와 실제 동작하는 코드가 포함되어 있습니다.
순서대로 따라하시면 전체 시스템을 구현하실 수 있습니다.
