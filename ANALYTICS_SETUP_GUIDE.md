# 스트림 세부정보

- 스트림 이름: galpi-home
- 스트림 URL: https://galpi.wisgraph.com/
- 스트림 ID: 13412353167
- 측정 ID: G-YZ6KKTCLQD

[[tag.md]]


---
# 갈피 홈페이지 분석 도구 통합 가이드

## 📋 개요

본 가이드는 갈피 홈페이지에 GA4(Google Analytics 4)와 Microsoft Clarity를 통합하여 방문자 행동, 전환율, 사용자 상호작용을 추적하는 방법을 안내합니다.

**추적 대상:**
- 페이지 뷰 (사용자가 어떤 페이지를 방문하는지)
- CTA 버튼 클릭 (다운로드, 가입 등 전환 행동)
- 스크롤 깊이 (페이지 어디까지 읽는지)
- 사용자 히트맵 (Microsoft Clarity)

---

## 1️⃣ Google Analytics 4 (GA4) 설정

### 1.1 GA4 계정 및 속성 생성

| 단계 | 작업 | 상세 절차 |
|------|------|----------|
| 1 | Google Analytics 접속 | 브라우저에서 [analytics.google.com](https://analytics.google.com) 접속 |
| 2 | Google 계정 로그인 | Google 계정으로 로그인 (없다면 계정 생성) |
| 3 | 속성 만들기 | 왼쪽 메뉴 하단 "관리" → "계정" 열 → "+ 속성 만들기" 클릭 |
| 4 | 기본 정보 입력 | 속성 이름: `갈피 홈페이지` 입력<br>보고 시간대: `대한민국` 선택<br>통화: `한국 원(KRW)` 선택<br>→ "다음" 클릭 |
| 5 | 비즈니스 정보 입력 (선택) | 업종 카테고리: `컴퓨터 및 전자` 또는 `소프트웨어`<br>비즈니스 규모: `소규모`<br>→ "다음" 클릭 |
| 6 | 비즈니스 목표 선택 | 웹사이트/앱 수익화 체크<br>사용자 참여 측정 체크<br>→ "만들기" 클릭 |
| 7 | 플랫폼 선택 | 웹사이트 옆 "설정" 클릭 |
| 8 | 웹사이트 스트림 생성 | 웹사이트 URL: `갈피 홈페이지의 실제 도메인` 입력<br>스트림 이름: `갈피 홈페이지 메인` 입력<br>→ "스트림 만들기" 클릭 |

### 1.2 측정 ID 확인 및 저장

| 단계 | 작업 | 상세 절차 |
|------|------|----------|
| 1 | 데이터 스트림 확인 | 생성된 웹사이트 스트림 페이지에서 "측정 ID" 찾기 |
| 2 | 측정 ID 복사 | `G-XXXXXXXXXX` 형식의 ID를 복사 |
| 3 | ID 저장 | 이 가이드의 [6. 환경 변수 설정] 섹션에서 사용 예정이므로 저장 |

**⚠️ 주의사항:**
- 측정 ID는 `G-`로 시작하는 문자열입니다.
- 이 ID는 나중에 `index.html` 파일에 추가할 때 필요합니다.
- 실제 도메인이 없는 경우 `http://localhost:5173` (Vite 기본 포트)로 테스트 가능합니다.

### 1.3 사용자 정의 이벤트 미리보기 (선택)

GA4는 페이지 뷰 이벤트를 자동으로 추적합니다. 하지만 다음과 같은 이벤트를 미리 정의해두면 추적이 더 쉬워집니다:

| 이벤트 이름 | 설명 |
|-----------|------|
| `cta_click` | CTA 버튼 클릭 |
| `scroll_depth` | 스크롤 깊이 (25%, 50%, 75%, 100%) |

**이벤트 생성 방법:**
1. 왼쪽 메뉴 → "구성" → "이벤트"
2. "이벤트 만들기" 클릭
3. 위 이벤트 이름들을 하나씩 생성

---

## 2️⃣ Microsoft Clarity 설정

### 2.1 Clarity 프로젝트 생성

| 단계 | 작업 | 상세 절차 |
|------|------|----------|
| 1 | Clarity 접속 | 브라우저에서 [clarity.microsoft.com](https://clarity.microsoft.com) 접속 |
| 2 | Microsoft 계정 로그인 | Microsoft 계정으로 로그인 (없다면 계정 생성) |
| 3 | 프로젝트 시작하기 | "새 프로젝트" 버튼 클릭 |
| 4 | 프로젝트 정보 입력 | 이름: `갈피 홈페이지`<br>URL: `갈피 홈페이지의 실제 도메인` (없으면 테스트 URL 입력)<br>→ "다음" 클릭 |
| 5 | 설치 방법 선택 | "Google Analytics" 연동 옵션 (선택 가능) → 건너뛰기 가능<br>→ "만들기" 클릭 |

### 2.2 프로젝트 ID 확인 및 저장

| 단계 | 작업 | 상세 절차 |
|------|------|----------|
| 1 | 설치 코드 확인 | "설치" 탭에서 스크립트 코드 확인 |
| 2 | 프로젝트 ID 추출 | 코드 내 `clarity("script", "프로젝트ID")` 부분에서 ID 추출 |
| 3 | ID 저장 | 이 가이드의 [6. 환경 변수 설정] 섹션에서 사용 예정이므로 저장 |

**⚠️ 주의사항:**
- 프로젝트 ID는 보통 8~10자리 알파벳+숫자 조합입니다.
- 이 ID는 나중에 `index.html` 파일에 추가할 때 필요합니다.

---

## 3️⃣ 환경 변수 설정

### 3.1 `.env.local` 파일 생성 (선택)

`.env` 파일이나 `.env.local` 파일을 생성하여 GA4 측정 ID와 Clarity 프로젝트 ID를 관리할 수 있습니다.

```env
# Google Analytics 4 측정 ID
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity 프로젝트 ID
VITE_CLARITY_PROJECT_ID=YOUR_PROJECT_ID
```

**⚠️ 주의사항:**
- Vite를 사용하므로 환경 변수 앞에 `VITE_` 접두사를 붙여야 합니다.
- `.env.local` 파일은 `.gitignore`에 포함되어야 합니다.

---

## 4️⃣ 개발 작업 요약 (개발자가 수행)

### 4.1 파일 생성/수정 목록

| 파일 | 작업 | 설명 |
|------|------|------|
| `index.html` | 수정 | GA4와 Clarity 스크립트 추가 |
| `lib/analytics.ts` | 생성 | 이벤트 추적 유틸리티 함수 |
| `hooks/usePageTracking.ts` | 생성 | 페이지 뷰 추적 훅 |
| `hooks/useScrollDepth.ts` | 생성 | 스크롤 깊이 추적 훅 |
| `components/AnalyticsProvider.tsx` | 생성 | 전역 제공자 컴포넌트 |
| `App.tsx` | 수정 | AnalyticsProvider 적용 |

### 4.2 CTA 버튼 추적 대상

| 컴포넌트 | 버튼 텍스트 | 이벤트 이름 | 위치 |
|---------|-----------|-----------|------|
| `HeroTextSection.tsx` | 다운로드 버튼 | `cta_download_hero` | hero_section |
| `HeroTextSection.tsx` | 기능 살펴보기 버튼 | `cta_features_hero` | hero_section |
| `PersonaCTA.tsx` | 요금제 보기 버튼 | `cta_pricing_persona` | persona_section |
| `Pricing.tsx` | 구매하기 버튼 | `cta_purchase_pricing` | pricing_section |
| `Pricing.tsx` | GitHub 링크 | `cta_github_pricing` | pricing_section |

---

## 5️⃣ 검증 및 테스트

### 5.1 로컬 환경 테스트

| 검증 항목 | 절차 | 확인 방법 |
|-----------|------|----------|
| 스크립트 로드 | `npm run dev` 실행 후 브라우저 개발자 도구 → 네트워크 탭 | `gtag.js`, `clarity.js` 요청 확인 |
| 페이지 뷰 추적 | 페이지 이동 후 GA4 실시간 보고서 확인 | 실시간 보고서 → 현재 사용자 탭에서 페이지 뷰 확인 |
| CTA 클릭 추적 | CTA 버튼 클릭 후 GA4 이벤트 보고서 확인 | 보고서 → 참여도 → 이벤트에서 이벤트 발생 확인 |
| 스크롤 깊이 추적 | 페이지 스크롤 후 GA4 이벤트 보고서 확인 | scroll_depth 이벤트 발생 확인 |
| Clarity 히트맵 | 페이지 이동 및 상호작용 후 Clarity 대시보드 확인 | 히트맵 및 세션 레코딩 데이터 확인 |

### 5.2 GA4 실시간 보고서 확인 방법

1. GA4 대시보드 접속
2. 왼쪽 메뉴 → "보고" → "실시간"
3. "현재 사용자" 탭에서 다음 확인:
   - 현재 사용자 수 (본인 포함)
   - 페이지 제목 및 경로
   - 이벤트 (버튼 클릭, 스크롤 등)

### 5.3 Clarity 대시보드 확인 방법

1. Clarity 대시보드 접속
2. 프로젝트 선택
3. 다음 탭에서 확인:
   - 대시보드: 세션, 페이지 뷰, 사용자 수
   - 히트맵: 클릭, 스크롤 히트맵
   - 세션 레코딩: 사용자 동영상 재생

---

## 6️⃣ 배포 전 체크리스트

### 6.1 사용자가 수행해야 할 작업

- [ ] Google Analytics 계정 생성 완료
- [ ] GA4 속성 생성 완료
- [ ] GA4 웹사이트 스트림 생성 완료
- [ ] GA4 측정 ID 확보 완료
- [ ] Microsoft Clarity 프로젝트 생성 완료
- [ ] Clarity 프로젝트 ID 확보 완료

### 6.2 개발자 작업

- [ ] `lib/analytics.ts` 생성 완료
- [ ] `hooks/usePageTracking.ts` 생성 완료
- [ ] `hooks/useScrollDepth.ts` 생성 완료
- [ ] `components/AnalyticsProvider.tsx` 생성 완료
- [ ] `index.html`에 GA4 스크립트 추가 완료
- [ ] `index.html`에 Clarity 스크립트 추가 완료
- [ ] `App.tsx`에 AnalyticsProvider 적용 완료

### 6.3 CTA 버튼 추적 추가

- [ ] HeroTextSection - 다운로드 버튼 추적 추가
- [ ] HeroTextSection - 기능 살펴보기 버튼 추적 추가
- [ ] PersonaCTA - 요금제 보기 버튼 추적 추가
- [ ] Pricing - 구매하기 버튼 추적 추가
- [ ] Pricing - GitHub 링크 추적 추가

### 6.4 테스트 및 검증

- [ ] 로컬 환경에서 GA4 스크립트 로드 확인
- [ ] 로컬 환경에서 Clarity 스크립트 로드 확인
- [ ] 페이지 뷰 추작 확인 (GA4 실시간 보고서)
- [ ] CTA 클릭 추적 확인 (GA4 이벤트 보고서)
- [ ] 스크롤 깊이 추적 확인 (GA4 이벤트 보고서)
- [ ] Clarity 히트맵 데이터 수집 확인

---

## 7️⃣ 배포 후 모니터링

### 7.1 GA4 모니터링

| 보고서 | 확인 항목 | 비고 |
|-------|----------|------|
| 보고 → 실시간 | 현재 사용자, 페이지 뷰, 이벤트 | 실시간 사용자 행동 |
| 보고 → 참여도 → 이벤트 | CTA 클릭, 스크롤 깊이 이벤트 수 | 전환 행동 추적 |
| 보고 → 참여도 → 콘텐츠 | 페이지 제목, 페이지 경로 | 인기 페이지 확인 |
| 탐색 → 사용자 유입 | 채널, 소스 | 트래픽 출처 확인 |

### 7.2 Clarity 모니터링

| 기능 | 확인 항목 | 비고 |
|------|----------|------|
| 대시보드 | 세션 수, 페이지 뷰, 사용자 수 | 전체 현황 |
| 히트맵 | 클릭 히트맵, 스크롤 히트맵 | 사용자 행동 시각화 |
| 세션 레코딩 | 사용자 세션 동영상 | 실제 사용자 동작 관찰 |
| 펀넬 | 페이지 이동 경로 | 전환 경로 분석 |

---

## 8️⃣ 문제 해결

### 8.1 데이터가 수집되지 않는 경우

| 증상 | 원인 | 해결 방법 |
|------|------|----------|
| GA4 스크립트 로드 실패 | 측정 ID가 잘못됨 | 측정 ID 재확인 및 수정 |
| Clarity 스크립트 로드 실패 | 프로젝트 ID가 잘못됨 | 프로젝트 ID 재확인 및 수정 |
| 이벤트가 기록되지 않음 | 이벤트 이름 또는 파라미터 오류 | `lib/analytics.ts` 코드 확인 |
| 실시간 보고서에 사용자 안 보임 | 광고 차단기 사용 | 광고 차단기 해제 후 테스트 |

### 8.2 스크롤 깊이 추적 오류

| 증상 | 원인 | 해결 방법 |
|------|------|----------|
| 스크롤 이벤트가 너무 많이 발생 | 중복 추적 방지 로직 오류 | `trackedDepths` Set 사용 확인 |
| 스크롤 이벤트가 발생하지 않음 | 스크롤 리스너 등록 실패 | `useScrollDepth` 훅 적용 확인 |

---

## 9️⃣ 참고 자료

### GA4 공식 문서
- [Google Analytics 4 시작하기](https://support.google.com/analytics/answer/9304153)
- [GA4 이벤트 추적](https://support.google.com/analytics/answer/9216061)
- [GA4 실시간 보고서](https://support.google.com/analytics/answer/9216200)

### Microsoft Clarity 공식 문서
- [Clarity 시작하기](https://learn.microsoft.com/en-us/clarity/)
- [Clarity 히트맵](https://learn.microsoft.com/en-us/clarity/setup-and-installation/heatmap-interpretation)
- [Clarity 세션 레코딩](https://learn.microsoft.com/en-us/clarity/session-recordings/overview)

---

## 🔐 개인정보 및 규정 준수

### 한국 개인정보보호법 준수

1. **쿠키 동의 수집**
   - 한국 사용자를 대상으로 하는 경우, 쿠키 사용에 대한 동의를 얻어야 합니다.
   - 쿠키 동의 배너를 구현하거나, 기존에 있다면 분석 도구 사용 동의를 포함하세요.

2. **데이터 익명화**
   - GA4에서 IP 주소 익명화를 활성화하세요.
   - 개인 식별 가능한 정보를 이벤트 파라미터에 포함하지 마세요.

3. **개인정보 처리방침**
   - GA4와 Clarity를 사용한다는 내용을 개인정보 처리방침에 추가하세요.
   - 데이터 수집 목적, 수집 항목, 보유 기간 등을 명시하세요.

---

## 📞 지원

이 가이드에 대한 질문이나 문제가 발생하면:
1. GA4: [Google Analytics 헬프 센터](https://support.google.com/analytics)
2. Clarity: [Microsoft Clarity 커뮤니티](https://clarity.microsoft.com/support)

---

**문서 버전:** 1.0
**최종 수정일:** 2026년 2월 4일

