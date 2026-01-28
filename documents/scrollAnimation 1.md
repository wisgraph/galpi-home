# 📘 React & GSAP ScrollTrigger 마스터리

## 제1장. 무대 설정: DOM 구조와 스타일링 전략 (The Stage)

애니메이션은 허공에서 일어나지 않습니다. GSAP이 "무엇을(Target)" "어떻게(Animation)" 움직이게 할지 명령하기 전에, 그 대상들이 물리적으로 어떻게 배치되어 있어야 하는지가 가장 중요합니다.

이 챕터는 **"핀(Pin) 애니메이션이 정상 작동하기 위한 3가지 물리 법칙"**을 다룹니다.

---

### 1-1. 뷰포트 장악: `h-screen` 불변의 법칙

스크롤 애니메이션, 특히 **"한 화면에 머무르며(Pinning) 이야기가 전개되는 연출"**을 하려면, 각 섹션(Panel)의 높이는 반드시 뷰포트와 일치해야 합니다.

* **코드 분석:**
`PersonaPanel.tsx`를 보면 최상위 `div`에 `h-screen` 클래스가 적용되어 있습니다.
```tsx
// PersonaPanel.tsx
<div ref={ref} className="h-screen w-full relative overflow-hidden">

```


* **왜 필수인가? (The Why):**
1. **몰입감 통제:** 높이가 `100vh`(h-screen)여야 사용자가 스크롤을 멈췄을 때, 이전 섹션의 꼬리나 다음 섹션의 머리가 보이지 않고 오직 현재 페르소나에만 집중할 수 있습니다.
2. **ScrollTrigger 계산의 기준:** GSAP의 `start: "top top"`(화면 맨 위가 요소의 맨 위에 닿을 때) 트리거가 정확하게 작동하려면, 요소 자체가 화면 높이만큼 자리를 차지하고 있어야 계산 오차가 없습니다.


* **⚠️ 작업자(AI)를 위한 메모:**
> 가로 스크롤로 변환할 때는 `h-screen`은 유지하되, **`w-screen` (또는 `min-w-full`)**을 적용하여 가로폭을 뷰포트에 꽉 채우는 것이 제1전제가 되어야 합니다.



---

### 1-2. 겹침의 미학: `absolute`와 `z-index` 레이어링

제공된 코드는 요소들이 순차적으로 등장(`Enter`)하고 퇴장(`Exit`)합니다. 이를 자연스럽게 처리하려면, 요소들이 서로 **"밀어내지 않고(Not Flow)"**, **"제자리에 겹쳐(Stacking)"** 있어야 합니다.

* **코드 분석:**
`PersonaPanel.tsx` 내부 구조를 보면 `absolute` 포지셔닝이 적극적으로 사용됩니다.
* **Layer 0 (배경):** `.persona-bg` -> `absolute inset-0`
* 부모 컨테이너(`relative`)의 전체를 덮습니다. 배경이 커지거나(`scale`) 사라져도 텍스트 위치에 영향을 주지 않습니다.


* **Layer 1 (장식 요소):** `Counter`, `Progress Dots` -> `absolute`
* 컨텐츠 흐름과 무관하게 고정된 위치(`top-28`, `right-8`)에 박혀 있습니다.


* **Layer 2 (메인 컨텐츠):** `content`, `solution` -> `relative z-10`
* 배경 위에 떠 있어야 하므로 `z-10`을 부여합니다.




* **핵심 원리:**
GSAP으로 `y`축 이동(`y: 50` -> `y: 0`)을 할 때, 요소가 `static`(기본값)이면 주변 요소들도 같이 밀려납니다. 하지만 `absolute`나 독립적인 `grid` 셀 내부에 배치하면, 해당 요소만 부드럽게 움직일 수 있습니다.
* **⚠️ 작업자(AI)를 위한 메모:**
> 가로 스크롤 변환 시에도 배경(`bg`)과 전경(`content`)의 레이어 분리는 필수입니다. 특히 가로로 이동할 때 배경 요소(`bg`)가 찢어지지 않도록 `inset-0` 처리가 중요합니다.



---

### 1-3. React와 GSAP의 가교: `Ref` 시스템의 정석

React는 Virtual DOM을 쓰지만, GSAP은 실제 DOM(Real DOM)을 제어합니다. 따라서 부모 컴포넌트(`PersonaTabs`)가 자식 컴포넌트(`PersonaPanel`)의 **실제 HTML 요소**를 손에 쥐고 있어야 합니다.

* **코드 분석:**
1. **부모 (`PersonaTabs.tsx`):** `panelsRef`라는 배열을 만들어 자식들의 주소를 저장할 공간을 확보합니다.
```tsx
const panelsRef = useRef<HTMLDivElement[]>([]);

```


2. **자식 (`PersonaPanel.tsx`):** `forwardRef`를 사용하여 자신의 최상위 `div`를 부모에게 노출시킵니다.
```tsx
const PersonaPanel = forwardRef<HTMLDivElement, PersonaPanelProps>(
  ({ persona, index, total }, ref) => { ... }
);

```


3. **연결 (`PersonaTabs.tsx`):** 렌더링 시점에 배열에 DOM을 할당합니다.
```tsx
ref={(el) => { if (el) panelsRef.current[index] = el; }}

```




* **셀렉터 전략 (`querySelector`):**
`PersonaTabs`에서는 `panelsRef`로 **패널(컨테이너)**만 잡고, 그 내부의 세부 요소(타이틀, 이미지 등)는 `querySelector(".class-name")`로 찾습니다.
```tsx
const content = panel.querySelector(".persona-content");

```


* **이유:** 모든 세부 요소에 일일이 `ref`를 달면 코드가 너무 복잡해집니다. "부모는 `ref`로 잡고, 자식은 `class`로 찾는다"는 이 패턴이 가장 효율적입니다.


* **⚠️ 작업자(AI)를 위한 메모:**
> 가로 스크롤 구현 시, 전체를 감싸는 **"가로로 긴 트랙(Track)"** 컨테이너가 하나 더 필요할 것입니다. 이때도 트랙에 대한 새로운 `ref`가 필요하며, 개별 패널의 `ref` 배열 관리 방식은 동일하게 유지해야 합니다.



---

**제1장 요약:**

* **높이:** `h-screen`으로 한 화면을 꽉 채워라.
* **배치:** 배경과 컨텐츠를 `absolute`/`relative`로 분리하여 독립적인 애니메이션이 가능하게 하라.
* **참조:** `forwardRef` 패턴으로 부모(애니메이션 제어자)에게 DOM 접근 권한을 위임하라.


