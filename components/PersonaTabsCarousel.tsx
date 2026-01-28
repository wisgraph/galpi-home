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

    const [activeIndex, setActiveIndex] = useState(0);

    // 클릭 시 해당 패널로 스크롤
    const scrollToPanel = useCallback((index: number) => {
        if (!scrollTriggerRef.current) return;

        const st = scrollTriggerRef.current;
        const totalDuration = 40; // 타임라인 총 길이 (각 패널 약 10 단위)
        const panelDuration = totalDuration / 4;
        const targetProgress = (index * panelDuration + panelDuration * 0.3) / totalDuration;

        // 해당 progress 위치로 스크롤
        const targetScroll = st.start + (st.end - st.start) * targetProgress;
        gsap.to(window, {
            scrollTo: targetScroll,
            duration: 0.8,
            ease: "power2.inOut"
        });
    }, []);

    useLayoutEffect(() => {
        const trigger = triggerRef.current;
        const horizontal = horizontalRef.current;

        if (!trigger || !horizontal) return;

        panelsRef.current = panelsRef.current.slice(0, personas.length);

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
                    end: "+=800%", // 더 여유있게
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // 현재 스크롤 진행도에 따라 activeIndex 업데이트
                        const progress = self.progress;
                        const newIndex = Math.min(3, Math.floor(progress * 4.5));
                        setActiveIndex(newIndex);
                    },
                },
            });

            // ScrollTrigger 참조 저장
            scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

            // =====================================
            // Panel 0
            // =====================================
            // Enter
            tl.to(allElements[0].background, { opacity: 1, scale: 1, duration: 2 })
                .to(allElements[0].content, { opacity: 1, x: 0, duration: 2 }, "<0.3")
                .to(allElements[0].solution, { opacity: 1, x: 0, duration: 2 }, "<0.2");

            // Hold
            tl.to({}, { duration: 4 });

            // Exit (완전히 끝난 후에 이동)
            tl.to(allElements[0].content, { opacity: 0, x: -50, duration: 2 })
                .to(allElements[0].solution, { opacity: 0, x: -50, duration: 2 }, "<")
                .to(allElements[0].background, { opacity: 0, scale: 1.1, duration: 2 }, "<");

            // Move (Exit 끝난 후)
            tl.to(horizontal, { xPercent: -25, duration: 2, ease: "power1.inOut" });

            // =====================================
            // Panel 1
            // =====================================
            // Enter (이동과 동시에 시작 - 크로스페이드 효과)
            tl.to(allElements[1].background, { opacity: 1, scale: 1, duration: 2 })
                .to(allElements[1].content, { opacity: 1, x: 0, duration: 2 }, "<0.3")
                .to(allElements[1].solution, { opacity: 1, x: 0, duration: 2 }, "<0.2");

            // Hold
            tl.to({}, { duration: 4 });

            // Exit
            tl.to(allElements[1].content, { opacity: 0, x: -50, duration: 2 })
                .to(allElements[1].solution, { opacity: 0, x: -50, duration: 2 }, "<")
                .to(allElements[1].background, { opacity: 0, scale: 1.1, duration: 2 }, "<");

            // Move
            tl.to(horizontal, { xPercent: -50, duration: 2, ease: "power1.inOut" });

            // =====================================
            // Panel 2
            // =====================================
            // Enter
            tl.to(allElements[2].background, { opacity: 1, scale: 1, duration: 2 })
                .to(allElements[2].content, { opacity: 1, x: 0, duration: 2 }, "<0.3")
                .to(allElements[2].solution, { opacity: 1, x: 0, duration: 2 }, "<0.2");

            // Hold
            tl.to({}, { duration: 4 });

            // Exit
            tl.to(allElements[2].content, { opacity: 0, x: -50, duration: 2 })
                .to(allElements[2].solution, { opacity: 0, x: -50, duration: 2 }, "<")
                .to(allElements[2].background, { opacity: 0, scale: 1.1, duration: 2 }, "<");

            // Move
            tl.to(horizontal, { xPercent: -75, duration: 2, ease: "power1.inOut" });

            // =====================================
            // Panel 3 (마지막)
            // =====================================
            // Enter
            tl.to(allElements[3].background, { opacity: 1, scale: 1, duration: 2 })
                .to(allElements[3].content, { opacity: 1, x: 0, duration: 2 }, "<0.3")
                .to(allElements[3].solution, { opacity: 1, x: 0, duration: 2 }, "<0.2");

            // Hold (마지막)
            tl.to({}, { duration: 4 });

            // Exit (일관성을 위해 마지막 패널도 페이드아웃)
            tl.to(allElements[3].content, { opacity: 0, x: -50, duration: 2 })
                .to(allElements[3].solution, { opacity: 0, x: -50, duration: 2 }, "<")
                .to(allElements[3].background, { opacity: 0, scale: 1.1, duration: 2 }, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="bg-slate-950">
            <PersonaHeader />

            <div ref={triggerRef} className="relative h-screen overflow-hidden">
                {/* Unified Progress Dots - Fixed position */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
                    {personas.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToPanel(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110
                                ${i === activeIndex
                                    ? "bg-white scale-125"
                                    : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to panel ${i + 1}`}
                        />
                    ))}
                </div>

                <div
                    ref={horizontalRef}
                    className="flex h-full w-[400%]"
                >
                    {personas.map((persona, index) => (
                        <div
                            key={persona.id}
                            className="w-screen h-full flex-shrink-0 relative"
                            ref={(el) => { if (el) panelsRef.current[index] = el; }}
                        >
                            <PersonaPanel
                                persona={persona}
                                index={index}
                                total={personas.length}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 bg-slate-950">
                <PersonaCTA />
            </div>
        </div>
    );
};


export default PersonaTabsCarousel;
