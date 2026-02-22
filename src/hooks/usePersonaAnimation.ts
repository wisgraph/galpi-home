import { useLayoutEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const usePersonaAnimation = (
    containerRef: RefObject<HTMLDivElement>,
    panelsRef: React.MutableRefObject<HTMLDivElement[]>,
    itemCount: number
) => {
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clean up refs array
        panelsRef.current = panelsRef.current.slice(0, itemCount);

        // Force ScrollTrigger refresh
        ScrollTrigger.refresh();

        const ctx = gsap.context(() => {
            panelsRef.current.forEach((panel) => {
                if (!panel) return;

                const content = panel.querySelector(".persona-content");
                const solution = panel.querySelector(".persona-solution");
                const features = panel.querySelectorAll(".persona-feature");
                const background = panel.querySelector(".persona-bg");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: "top top",
                        end: "+=300%",
                        pin: true,
                        pinSpacing: true,
                        scrub: 1,
                    },
                });

                // 1. Background Enter
                if (background) {
                    tl.fromTo(
                        background,
                        { scale: 1.2, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
                    );
                }

                // 2. Content Enter
                if (content) {
                    tl.fromTo(
                        content,
                        { y: 50, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 2, ease: "power3.out" },
                        "<+0.5",
                    );
                }

                // 3. Solution Enter
                if (solution) {
                    tl.fromTo(
                        solution,
                        { y: 50, scale: 0.9, autoAlpha: 0 },
                        { y: 0, scale: 1, autoAlpha: 1, duration: 2, ease: "power3.out" },
                        "<+0.2",
                    );
                }

                // 4. Features Enter
                if (features.length > 0) {
                    tl.fromTo(
                        features,
                        { x: 30, autoAlpha: 0 },
                        {
                            x: 0,
                            autoAlpha: 1,
                            stagger: 0.1,
                            duration: 1.5,
                            ease: "power2.out",
                        },
                        "<+0.5",
                    );
                }

                // 5. Hold
                tl.to({}, { duration: 4 });

                // 6. Exit
                tl.to([content, solution, features], {
                    y: -50,
                    autoAlpha: 0,
                    duration: 2,
                    stagger: 0.05,
                    ease: "power2.in",
                });

                if (background) {
                    tl.to(
                        background,
                        {
                            opacity: 0,
                            scale: 1.1,
                            duration: 2,
                        },
                        "<",
                    );
                }
            });
        }, container);

        return () => ctx.revert();
    }, [itemCount, containerRef, panelsRef]);
};
