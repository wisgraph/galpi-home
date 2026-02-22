# 백엔드 코드 리뷰 리포트 (Rust)

## 📋 개요

`src-tauri` 백엔드 코드베이스를 프론트엔드와 동일한 기준으로 검토했습니다:
- 함수/파일의 책임 과다 여부
- 아키텍처 일관성
- 계산 로직 분리 상태
- 함수형 패턴 적용 여부
- 코드 예측 가능성

---

## ✅ 양호한 부분

### 1. 아키텍처 구조 (Clean Architecture 준수)
```
commands/     → Interface Layer (Tauri 커맨드)
services/     → Business Logic
repositories/ → Data Access
infrastructure/ → Platform-specific (macOS)
core/         → App Engine
```

**평가**: 계층 분리가 명확하고 의존성 방향이 올바름 ✅

### 2. 순수 함수 분리 (`text_analysis.rs`)
- `analyze_text()`, `prepare_search_pattern()` 등이 순수 함수로 잘 구현됨
- 테스트 가능한 구조
- 부수 효과 없음

**평가**: 함수형 패턴 적절히 적용됨 ✅

---

## ⚠️ 리팩토링 권장 사항

### 🔴 1. `commands/search.rs` - God Function 패턴

**문제점:**
- `search_hooks()` 함수가 284줄 중 150줄을 차지 (Line 38-151)
- 쿼리 파싱, 태그 필터링, 점수 계산, 정렬을 모두 한 함수에서 처리
- `search_tags()` 함수도 130줄로 과도하게 복잡 (Line 154-283)

**현재 구조:**
```rust
pub fn search_hooks(...) {
    // 1. 쿼리 파싱 (15줄)
    // 2. 빈 쿼리 처리 (10줄)
    // 3. 패턴 준비 (5줄)
    // 4. 태그 필터링 (25줄)
    // 5. 텍스트 매칭 (40줄)
    // 6. 점수 계산 (20줄)
    // 7. 정렬 및 반환 (10줄)
}
```

**권장 조치:**
```rust
// services/search_service.rs (신규)
pub struct SearchService;

impl SearchService {
    pub fn search(hooks: &[Hook], query: &str) -> Vec<Hook> {
        let parsed = Self::parse_query(query);
        let filtered = Self::filter_by_tags(hooks, &parsed.tags);
        let scored = Self::score_matches(filtered, &parsed.text_query);
        Self::sort_and_limit(scored, 50)
    }

    fn parse_query(query: &str) -> ParsedQuery { ... }
    fn filter_by_tags(...) -> Vec<&Hook> { ... }
    fn score_matches(...) -> Vec<(Hook, u32)> { ... }
    fn sort_and_limit(...) -> Vec<Hook> { ... }
}

// commands/search.rs
pub fn search_hooks(state: State<AppState>, query: String) -> Result<Vec<Hook>, String> {
    let hooks = state.hooks.lock()?;
    Ok(SearchService::search(&hooks, &query))
}
```

**중요도**: 🔴 **높음** (가독성 및 테스트 용이성 대폭 개선)

---

### 🟡 2. `services/hook_service.rs` - 레거시 코드 잔존

**문제점:**
- 주석 처리된 DB 관련 코드가 대량 존재 (Line 83-89, 130-143, 147-160 등)
- `resolve_hook_target()`, `get_all_hooks()`, `search_hooks()` 등이 사용되지 않음
- 코드 가독성 저하

**권장 조치:**
- 사용되지 않는 함수 완전 제거
- 주석 처리된 DB 코드 삭제
- JSONL 전용 로직만 남기기

**중요도**: 🟡 **중** (기능에는 영향 없으나 유지보수성 저하)

---

### 🟡 3. `repositories/hook_repo.rs` - Dead Code

**문제점:**
- 전체 406줄 중 대부분이 사용되지 않는 DB 함수
- `insert_or_update()`, `get_all()`, `search()` 등이 호출되지 않음
- 파일 전체가 레거시 상태

**권장 조치:**
- 파일 전체 삭제 또는 `deprecated/` 폴더로 이동
- 실제 사용 중인 함수만 남기기 (현재는 없음)

**중요도**: 🟡 **중** (혼란 방지)

---

### 🟢 4. `commands/hook.rs` - 얇은 래퍼 유지

**문제점:**
- 주석 처리된 DB 연결 코드 존재 (Line 32-41 등)

**권장 조치:**
- 주석 정리
- 함수 시그니처 단순화

**중요도**: 🟢 **낮음** (구조는 양호)

---

## 📊 리팩토링 우선순위

| 순위 | 대상 | 작업 | 예상 시간 | 영향도 |
|------|------|------|----------|--------|
| 1 | `commands/search.rs` | God Function 분해 → SearchService 생성 | 1시간 | 높음 |
| 2 | `services/hook_service.rs` | 레거시 코드 제거 | 30분 | 중간 |
| 3 | `repositories/hook_repo.rs` | Dead Code 제거 | 20분 | 중간 |
| 4 | `commands/hook.rs` | 주석 정리 | 10분 | 낮음 |

---

## 🎯 권장 리팩토링 패턴

### Before (현재):
```rust
// commands/search.rs
pub fn search_hooks(...) {
    // 150줄의 복잡한 로직
}
```

### After (권장):
```rust
// services/search_service.rs
pub struct SearchService;
impl SearchService {
    pub fn search(...) -> Vec<Hook> { ... }
    fn parse_query(...) -> ParsedQuery { ... }
    fn filter_by_tags(...) -> Vec<&Hook> { ... }
    fn score_matches(...) -> Vec<(Hook, u32)> { ... }
}

// commands/search.rs
pub fn search_hooks(...) -> Result<Vec<Hook>, String> {
    let hooks = state.hooks.lock()?;
    Ok(SearchService::search(&hooks, &query))
}
```

**효과:**
- ✅ 각 함수가 단일 책임만 가짐
- ✅ 테스트 용이성 향상 (Service 단위 테스트 가능)
- ✅ 코드 재사용성 증가
- ✅ 예측 가능성 향상

---

## 📝 결론

**전체 평가**: 🟢 **양호** (아키텍처는 우수하나 세부 개선 필요)

**핵심 개선 포인트:**
1. `search.rs`의 God Function을 Service로 분해
2. 레거시 DB 코드 완전 제거
3. Dead Code 정리

이 작업들을 완료하면 백엔드도 프론트엔드와 동일한 수준의 **높은 예측 가능성**과 **유지보수성**을 확보할 수 있습니다.
