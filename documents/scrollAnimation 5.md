# 📘 React & GSAP ScrollTrigger 마스터리

## 제5장. 응용: 수직에서 수평으로 (Vertical to Horizontal)

기존 `PersonaTabs.tsx`는 **"패널이 제자리에서 고정(Pin)되고 내용이 바뀐 뒤, 핀이 풀리면 다음 패널이 아래에서 올라오는"** 방식이었습니다.

이것을 가로 스크롤로 변환하려면, 물리적 구조를 **'기차(Train)'**처럼 길게 만들고, 스크롤을 내릴 때 기차를 **'왼쪽'**으로 당겨야 합니다.

---

### 5-1. 구조의 대전환: 트랙 시스템 (The Track System)

수직 스크롤은 `block` 요소의 자연스러운 배치를 이용하지만, 가로 스크롤은 강제적인 배치가 필요합니다.

* **현재 구조 (Vertical):**
```tsx
<section>
   <Panel /> (h-screen)
   <Panel /> (h-screen)
</section>

```


* **변경 구조 (Horizontal):**
수평 이동을 위해 **'움직이는 트랙(Slider)'**과 **'고정된 창문(Container)'**이 필요합니다.
```tsx
<section ref={containerRef} className="overflow-hidden"> {/* 고정된 창문 */}
   <div ref={trackRef} className="flex flex-row w-[400%]"> {/* 움직이는 기차 (4개일 때) */}
      <Panel className="w-screen h-screen flex-shrink-0" />
      <Panel className="w-screen h-screen flex-shrink-0" />
   </div>
</section>

```


* **⚠️ 작업자(AI)를 위한 지침 1:**
1. `PersonaTabs` 컴포넌트에 `trackRef`를 추가하라.
2. `flex-col`을 **`flex-row`**로 변경하라.
3. 개별 `PersonaPanel`에 **`w-screen flex-shrink-0`** 클래스를 추가하여 가로폭을 뷰포트에 고정하라.
4. 트랙(`trackRef`)의 너비는 `fit-content` 혹은 `panels.length * 100%`로 설정하라.



---

### 5-2. 엔진 교체: `xPercent` 이동 (The Fake Horizontal Scroll)

이제 개별 패널을 Pinning 하는 것이 아니라, **전체 컨테이너를 Pinning** 하고 트랙을 왼쪽으로 미는 방식으로 로직이 완전히 바뀝니다.

* **기존 로직 (Vertical):**
* 각 패널마다 `ScrollTrigger` 생성 -> 각자 `pin: true`.


* **변경 로직 (Horizontal):**
* **단 하나의 메인 `ScrollTrigger**` 생성.
* 트리거: `containerRef`.
* 동작: 스크롤을 내리면 `trackRef`를 `xPercent: -100 * (total - 1)` 만큼 이동.


* **⚠️ 작업자(AI)를 위한 지침 2:**
```javascript
// 메인 가로 스크롤 트윈 (Main Scroll Tween)
const scrollTween = gsap.to(trackRef.current, {
  xPercent: -100 * (personas.length - 1), // 전체 패널 길이만큼 왼쪽으로 이동
  ease: "none", // 등속 이동 (필수)
  scrollTrigger: {
    trigger: containerRef.current,
    pin: true, // 전체 섹션 고정
    scrub: 1,  // 부드러운 감속
    snap: 1 / (personas.length - 1), // (선택사항) 패널 단위로 딱딱 멈추기
    end: "+=3000", // 가로 스크롤 길이 확보
  }
});

```



---

### 5-3. 내부 애니메이션의 부활: `containerAnimation` (The Link)

가장 중요한 부분입니다. 3장에서 배웠던 **"등장(Fade In) -> 퇴장(Fade Out)"** 효과를 가로 스크롤에서도 유지하려면 어떻게 해야 할까요?

가로 스크롤 중에는 개별 패널이 실제로 '수직 스크롤' 되는 것이 아니므로, 일반적인 `trigger: panel`은 작동하지 않습니다. 이때 GSAP의 **`containerAnimation`** 속성을 사용해야 합니다.

* **핵심 원리:**
"메인 트랙이 왼쪽으로 움직이는 애니메이션(`scrollTween`)을 참조하여, 내 패널이 화면에 들어오는 타이밍을 계산해라."
* **⚠️ 작업자(AI)를 위한 지침 3:**
각 패널 내부의 요소(`content`, `solution` 등) 애니메이션을 다음과 같이 수정하라.
```javascript
panelsRef.current.forEach((panel, i) => {
  // 내부 요소 선택 (기존과 동일)
  const content = panel.querySelector(".persona-content");

  // 개별 패널 애니메이션
  gsap.fromTo(content,
    { autoAlpha: 0, y: 50 },
    {
      autoAlpha: 1, y: 0,
      scrollTrigger: {
        trigger: panel, // 각 패널을 트리거로 잡되,
        containerAnimation: scrollTween, // [핵심] 메인 가로 이동 트윈을 참조!
        start: "left center", // 패널의 왼쪽이 화면 중앙에 올 때
        toggleActions: "play none none reverse", // 들어오면 재생, 나가면 역재생
      }
    }
  );
});

```



---

### 5-4. 최종 점검 리스트 (Checklist for the Worker)

다음 작업자(AI)는 이 교과서를 바탕으로 코드를 작성할 때 다음 항목을 체크해야 합니다.

1. [ ] **Layout:** `flex-row`, `w-screen`, `h-screen`, `overflow-hidden`이 정확히 적용되었는가?
2. [ ] **Ref:** `containerRef`(고정용), `trackRef`(이동용), `panelsRef`(내부 감지용) 3박자가 갖춰졌는가?
3. [ ] **Main Trigger:** `xPercent`를 사용하여 트랙 전체를 움직이고 있는가?
4. [ ] **Nested Trigger:** 내부 페이드인 효과에 `containerAnimation` 속성을 연결했는가?

