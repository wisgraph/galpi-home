import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { personas } from "./persona/personaData";
import PersonaHeader from "./persona/PersonaHeader";
import PersonaPanel from "./persona/PersonaPanel";
import PersonaCTA from "./persona/PersonaCTA";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PersonaTabsCarousel: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLDivElement[]>([]);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    // Filter to only 2 personas
    const displayPersonas = personas.slice(0, 2);
    const personaCount = displayPersonas.length;

    const [activeIndex, setActiveIndex] = useState(0);

    // 클릭 시 해당 패널로 스크롤
    const scrollToPanel = useCallback((index: number) => {
        if (!scrollTriggerRef.current) return;

        const st = scrollTriggerRef.current;
        // 타임라인 계산: 각 패널당 (Enter 2 + Hold 4 + Exit 2) = 8단위, 이동은 패널 사이마다 2단위
        const totalDuration = personaCount * 8 + (personaCount - 1) * 2;
        const panelDuration = 10; // (Enter 2 + Hold 4 + Exit 2 + Move 2)
        const targetProgress = (index * panelDuration + 3.5) / totalDuration;

        // 해당 progress 위치로 스크롤
        const targetScroll = st.start + (st.end - st.start) * targetProgress;
        gsap.to(window, {
            scrollTo: targetScroll,
            duration: 0.8,
            ease: "power2.inOut"
        });
    }, [personaCount]);

    useLayoutEffect(() => {
        const trigger = triggerRef.current;
        const horizontal = horizontalRef.current;

        if (!trigger || !horizontal) return;

        panelsRef.current = panelsRef.current.slice(0, personaCount);

        const ctx = gsap.context(() => {
            const allElements = panelsRef.current.map(panel => ({
                content: panel?.querySelector(".persona-content"),
                solution: panel?.querySelector(".persona-solution"),
                background: panel?.querySelector(".persona-bg"),
            }));

            // 초기 상태: 모든 패널 숨김
            allElements.forEach(({ content, solution, background }) => {
                gsap.set([content, solution], { opacity: 0, x: 50 });
                gsap.set(background, { opacity: 0, scale: 1.15 });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: `+=${personaCount * 200}%`, // 패널 수에 비례하게 조정
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // 현재 스크롤 진행도에 따라 activeIndex 업데이트
                        const progress = self.progress;
                        const newIndex = Math.min(personaCount - 1, Math.floor(progress * (personaCount + 0.5)));
                        setActiveIndex(newIndex);
                    },
                },
            });

            // ScrollTrigger 참조 저장
            scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

            // 동적으로 타임라인 생성
            displayPersonas.forEach((_, index) => {
                const el = allElements[index];
                if (!el) return;

                // Enter
                tl.to(el.background, { opacity: 1, scale: 1, duration: 2 })
                    .to(el.content, { opacity: 1, x: 0, duration: 2 }, "<0.3")
                    .to(el.solution, { opacity: 1, x: 0, duration: 2 }, "<0.2");

                // Hold
                tl.to({}, { duration: 4 });

                // Exit (마지막 패널도 페이드아웃하여 다음 섹션과 연결)
                tl.to(el.content, { opacity: 0, x: -50, duration: 2 })
                    .to(el.solution, { opacity: 0, x: -50, duration: 2 }, "<")
                    .to(el.background, { opacity: 0, scale: 1.1, duration: 2 }, "<");

                // 만약 마지막 패널이 아니라면 이동
                if (index < personaCount - 1) {
                    tl.to(horizontal, {
                        xPercent: -(100 / personaCount) * (index + 1),
                        duration: 2,
                        ease: "power1.inOut"
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [personaCount, displayPersonas]);

    return (
        <div ref={sectionRef} className="bg-slate-50 dark:bg-slate-950">
            <PersonaHeader />

            <div ref={triggerRef} className="relative h-screen overflow-hidden">
                {/* Unified Progress Dots - Fixed position */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
                    {displayPersonas.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToPanel(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110
                                ${i === activeIndex
                                    ? "bg-slate-900 dark:bg-white scale-125"
                                    : "bg-slate-300 dark:bg-white/30 hover:bg-slate-400 dark:hover:bg-white/50"
                                }`}
                            aria-label={`Go to panel ${i + 1}`}
                        />
                    ))}
                </div>

                <div
                    ref={horizontalRef}
                    className="flex h-full"
                    style={{ width: `${personaCount * 100}%` }}
                >
                    {displayPersonas.map((persona, index) => (
                        <div
                            key={persona.id}
                            className="w-screen h-full flex-shrink-0 relative"
                            ref={(el) => { if (el) panelsRef.current[index] = el; }}
                        >
                            <PersonaPanel
                                persona={persona}
                                index={index}
                                total={personaCount}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 bg-slate-50 dark:bg-slate-950">
                <PersonaCTA />
            </div>
        </div>
    );
};


export default PersonaTabsCarousel;
