# 아키텍처: 단방향 데이터 흐름 (Unidirectional Data Flow)

본 문서는 프론트엔드 코드의 상태 관리 및 데이터 흐름 패턴을 설명합니다.

## 핵심 원칙

### 1. Functional Core, Imperative Shell
- **Services (Functional Core)**: 순수 함수로 구성, 부수 효과 없음
- **Controllers (Imperative Shell)**: API 호출 및 상태 변경 담당
- **Stores**: Svelte 5 Rune 기반 반응형 상태 저장소

### 2. 단방향 데이터 흐름

```
User Input (View)
    ↓
Controller (Orchestrator)
    ↓
Service (Pure Calculation) ← 필요시
    ↓
Controller (State Update)
    ↓
Store (State Change)
    ↓
View (Auto React via $effect)
```

## 디렉토리 구조

```
src/lib/
├── states/           # Svelte 5 Rune Stores (상태 저장소)
│   ├── hookState.svelte.ts
│   ├── searchState.svelte.ts
│   └── viewContext.svelte.ts
├── services/         # Pure Functions (순수 계산 로직)
│   ├── hookService.ts
│   ├── iconService.ts
│   ├── navigationService.ts
│   └── textService.ts
├── mutations/        # Controllers (상태 변경 오케스트레이터)
│   ├── hookDataController.ts
│   ├── listController.ts
│   └── viewController.ts
└── views/            # Svelte Components (UI)
```

## 명명 규칙

### Store 메서드
- `_메서드명()`: 내부용 (Controller에서만 호출)
  - 예: `searchState._setQuery()`
- `메서드명()`: 공개용 (어디서든 호출 가능)
  - 예: `hookState.filteredLen()`

### Controller 메서드
- `handle메서드명()`: 사용자 이벤트 핸들러
  - 예: `listController.handleQueryChange()`
- `_메서드명()`: 내부 헬퍼 함수
  - 예: `listController._adjustSelectedIndex()`

## 예시: 검색어 입력 흐름

```typescript
// 1. User Input (View)
<input oninput={handleInput} />

// 2. Controller
function handleInput(e: Event) {
  const input = e.target as HTMLInputElement;
  listController.handleQueryChange(input.value);
}

// 3. Controller -> Service (계산)
handleQueryChange(newQuery: string) {
  searchState._setQuery(newQuery);
  
  // Service에 계산 위임
  const newIndex = navigationService.calculateAdjustedIndex({
    currentIndex: searchState.selectedIndex,
    listLength: hookState.filteredLen(),
    viewMode: viewContext.view
  });
  
  // 4. Controller -> Store (상태 변경)
  searchState._setSelectedIndex(newIndex);
}

// 5. View (자동 반응)
$effect(() => {
  console.log('Query changed:', searchState.query);
  // UI 자동 업데이트
});
```

## 상태 변경 규칙

1. **절대 직접 변경 금지**
   ```typescript
   // ❌ Bad
   searchState.query = "new value";
   
   // ✅ Good
   searchState._setQuery("new value");
   ```

2. **Controller를 통한 변경**
   ```typescript
   // ❌ Bad (View에서 직접 Store 변경)
   function onClick() {
     searchState._setSelectedIndex(0);
   }
   
   // ✅ Good (Controller를 통한 변경)
   function onClick() {
     listController.resetSelection();
   }
   ```

3. **Service는 상태를 읽지 않음**
   ```typescript
   // ❌ Bad (Service가 Store 참조)
   export const myService = {
     calculate() {
       return searchState.query.length; // ❌
     }
   }
   
   // ✅ Good (Service는 파라미터로 받음)
   export const myService = {
     calculate(query: string) {
       return query.length; // ✅
     }
   }
   ```

## 테스트 전략

### Service 테스트 (Unit Test)
순수 함수이므로 모킹 없이 테스트 가능:
```typescript
test('navigationService.clampIndex', () => {
  expect(navigationService.clampIndex(10, 5)).toBe(4);
  expect(navigationService.clampIndex(-1, 5)).toBe(-1);
});
```

### Controller 테스트 (Integration Test)
Store와의 통합 테스트:
```typescript
test('listController.handleQueryChange', () => {
  listController.handleQueryChange('test');
  expect(searchState.query).toBe('test');
});
```

## 리팩토링 히스토리

- **1단계 (완료)**: Service 순수화 - 비즈니스 로직을 순수 함수로 추출
- **2단계 (완료)**: DOM 조작 제거 - 반응형 상태 기반으로 전환
- **3단계 (완료)**: 상태 관리 패턴 정립 - 단방향 데이터 흐름 명확화
