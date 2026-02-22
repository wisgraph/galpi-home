# Cloudflare Pages 환경 결제선생 + 구글 폼 연동 가이드

이 문서는 Galpi 프로젝트의 결제 시스템을 Cloudflare Pages (Edge Runtime) 환경에 배포하고 운영하기 위해, **대표님이 직접 설정해야 하는 항목 및 연동 구조**를 설명합니다.

## 1. 시스템 동작 구조

1. **결제 요청 (프론트엔드 -> `/api/payments/send`)**
   - 사용자가 `PaymentModal`에서 이름, 전화번호, 이메일을 입력하고 "결제 요청" 클릭
   - Next.js 서버(Edge)는 결제선생 API를 호출해 카카오톡 알림톡(청구서)을 발송
   - **중요**: 결제선생은 이메일 정보를 따로 받지 않으므로, 추후 구글 폼으로 전송하기 위해 임시로 **Cloudflare KV**에 해당 주문번호(`bill_id`)와 이메일 등 사용자 정보를 저장 (만료시간 3일 설정)

2. **결제 처리 대기**
   - 사용자는 휴대폰(카카오톡)으로 받은 청구서를 통해 카드 결제 진행

3. **결제 완료 콜백 (결제선생 -> `/api/payments/callback`)**
   - 결제가 성공(`appr_state: 'F'`)하면 결제선생 서버가 Cloudflare Pages 서버로 웹훅을 보냄
   - 서버는 `bill_id`로 Cloudflare KV를 조회하여 사용자가 처음에 입력했던 "이메일"과 "상품 정보"를 꺼냄
   - 이 데이터들을 조합해 **구글 폼 URL로 HTTP POST 요청**을 전송 (미리 세팅해둔 Apps Script가 이를 받아 라이선스 메일을 발송)
   - 처리가 끝난 KV 데이터는 삭제하여 저장소 용량 절약

---

## 2. 대표님이 직접 하셔야 할 작업 (TODO)

Cloudflare Pages에 프론트엔드를 배포하시면서 대시보드에서 다음 2가지를 필수로 설정해주셔야 합니다.

### [작업 1] Cloudflare KV 네임스페이스 생성 및 바인딩

결제 중인 사용자의 이메일 정보를 임시 보관할 저장소를 연결해야 합니다.

1. Cloudflare 대시보드 접속 -> 왼쪽 메뉴의 `Workers & Pages` -> `KV`로 이동
2. **Create a namespace** 버튼 클릭 -> 이름 입력 (예: `galpi-payments-kv` 자유롭게 작성) -> Add 클릭
3. 현재 배포된 Pages 프로젝트(홈페이지 앱) 페이지로 이동
4. `Settings(설정)` -> `Functions(함수) -> KV namespace bindings` 섹션 또는 `Settings -> Bindings` 메뉴로 이동
5. **Add binding** (연결 추가) 클릭:
   - **Variable name (변수명): `PAYMENTS_KV` (필수: 코드에 하드코딩 되어있습니다, 오타 주의)**
   - KV namespace: 방금 전 생성한 `galpi-payments-kv` 공간 선택
6. 저장 후, Pages를 무조건 **새롭게 재배포(Redeploy)** 하셔야 반영됩니다.

### [작업 2] 환경 변수 (Environment Variables) 설정

Pages 프로젝트 메뉴 -> `Settings(설정)` -> `Environment variables(환경 변수)` 항목에서 **Production** 환경에 다음 값들을 추가해 주세요:

| Variable name (변수명) | 들어갈 값 (Value) 힌트 |
| :--- | :--- |
| `PAYMINT_BASE_URL` | 운영 서버 URL (결제선생 문서/가이드 참조) |
| `PAYMINT_API_KEY` | 운영 API Key |
| `PAYMINT_MEMBER` | 가입하신 회원 ID / 상점 식별자 |
| `PAYMINT_MERCHANT` | 가입 머천트 정보 |
| `GOOGLE_FORM_URL` | `https://docs.google.com/forms/d/e/.../formResponse` (구매송신 문서 참조) |
| `NEXT_PUBLIC_BASE_URL` | 홈페이지 정식 도메인 (예: `https://galpi.wisgraph.com` - 끝에 슬래시 제외) |

> **참고**: `NEXT_PUBLIC_BASE_URL` 값이 셋팅되어야만, 결제선생 서버에 "성공 시 이 콜백 URL로 알려줘" 라고 보낼 때 `https://galpi.wisgraph.com/api/payments/callback` 형식으로 올바르게 주소를 전달할 수 있습니다.

---

## 3. 코드 관련 결정 사항

현재 구매 모달 (`PaymentModal.tsx`)에서 백엔드로 결제 요청을 보낼 때, 원화 금액을 넘겨야 해서 임의로 **7,000원**으로 고정 세팅(하드 코딩)해둔 상태입니다.
- 달러 가격($4.99)에 맞추어 7000원 고정으로 갈지, 아니면 정확히 계산된 환율이나 다른 원화 금액으로 책정하실지 결정이 필요합니다.
- 코드는 이미 제가 작성하여 `/api/payments/send`와 `/api/payments/callback` 에 다 들어가있으니, 대표님은 클라우드플레어 설정과 가격 고정만 해주시면 바로 라이브됩니다!
