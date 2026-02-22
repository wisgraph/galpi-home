# 📘 React & GSAP ScrollTrigger 마스터리

## 제4장. React와의 동거: 라이프사이클 관리 (Integration)

`PersonaTabs.tsx`는 React 환경에서 GSAP을 사용할 때 반드시 지켜야 할 **3가지 철칙**을 완벽하게 준수하고 있습니다. 작업자(AI)는 이 패턴을 복사하여 사용해야 합니다.

---

### 4-1. 타이밍이 생명이다: `useLayoutEffect`

React에는 `useEffect`가 있지만, ScrollTrigger와 같은 정밀한 UI 계산이 필요한 작업에는 **`useLayoutEffect`**를 써야 합니다.

* **코드 분석:**
```tsx
// PersonaTabs.tsx
useLayoutEffect(() => {
  // GSAP Animation Logic...
}, []);

```


* **왜 `useEffect`가 아닌가? (The Why):**
* `useEffect`: 브라우저가 화면을 그린 **후(Paint)**에 비동기적으로 실행됩니다. 사용자는 찰나의 순간, 애니메이션이 적용되지 않은 깨진 레이아웃을 볼 수 있습니다 (FOUC 현상).
* `useLayoutEffect`: DOM이 변경된 후, 브라우저가 화면을 그리기 **전(Paint)**에 동기적으로 실행됩니다. GSAP이 레이아웃을 계산하고 `Pin`을 설정하기에 가장 완벽한 시점입니다.



---

### 4-2. 흔적 남기지 않기: `gsap.context`와 `revert`

React 18의 **Strict Mode**는 컴포넌트를 개발 모드에서 두 번 마운트합니다. 만약 정리(Cleanup)를 안 하면 ScrollTrigger가 2개씩 생성되어 스크롤이 고장 납니다.

* **코드 분석:**
```tsx
// PersonaTabs.tsx
const ctx = gsap.context(() => {
  // 이 내부에서 생성된 모든 GSAP 애니메이션/ScrollTrigger는
  // ctx에 자동으로 기록됩니다.
  panelsRef.current.forEach(...)
}, container); // Scope 설정

// Cleanup Function
return () => ctx.revert(); // 마운트 해제 시 모든 애니메이션 원상복구 및 제거

```


* **핵심 원리:**
* `gsap.context(() => { ... })`: 이 블록 안에서 `tl`, `to`, `from` 등을 호출하면 GSAP이 알아서 추적합니다.
* `ctx.revert()`: 컴포넌트가 사라질 때(Unmount), 추적했던 모든 애니메이션을 초기 상태로 되돌리고(`revert`), 메모리에서 `kill` 합니다. 이것이 없으면 다른 페이지로 이동해도 스크롤 이벤트가 계속 발생합니다.


* **⚠️ 작업자(AI)를 위한 메모:**
> 가로 스크롤 변환 시에도 이 `gsap.context` 래퍼(Wrapper) 구조는 **절대 변경하지 마십시오.** 애니메이션 로직만 바꾸고, 이 껍데기는 그대로 유지해야 안전합니다.



---

### 4-3. 동적 레이아웃 대응: Ref 관리와 Refresh

React는 데이터(`personas` 배열)에 따라 DOM을 동적으로 생성합니다. 따라서 Ref 배열도 동적으로 관리해야 하며, 레이아웃 변경 사실을 ScrollTrigger에 알려야 합니다.

* **코드 분석:**
```tsx
// 1. Ref 배열 초기화 (null 방지)
panelsRef.current = panelsRef.current.slice(0, personas.length);

// 2. 강제 새로고침
ScrollTrigger.refresh();

```


* **원리:**
* `slice(0, length)`: 리렌더링 과정에서 `personas` 데이터가 줄어들 경우, `panelsRef`에 남아있는 불필요한(죽은) DOM 참조를 잘라냅니다.
* `ScrollTrigger.refresh()`: 이미지 로딩이나 다른 컴포넌트의 변화로 페이지 높이가 달라졌을 수 있으므로, ScrollTrigger에게 "좌표 다시 계산해!"라고 명령합니다.



---

**제4장 요약:**

* **시점:** `useLayoutEffect`로 화면 그려지기 전에 세팅하라.
* **청소:** `gsap.context`로 감싸고, `revert()`로 뒷정리하라.
* **갱신:** 동적 리스트는 Ref를 정리하고 `refresh()`를 호출하라.

