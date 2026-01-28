import { RefObject, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroAnimationRefs {
    cinemaBox: RefObject<HTMLDivElement>;
    problemLayer: RefObject<HTMLDivElement>;
    solutionLayer: RefObject<HTMLDivElement>;
    overlay: RefObject<HTMLDivElement>;
    videoWrapper: RefObject<HTMLDivElement>;
    slowTimer: RefObject<HTMLDivElement>;
    fastTimer: RefObject<HTMLDivElement>;
    video: RefObject<HTMLVideoElement>;
}

export const useHeroAnimation = (
    containerRef: RefObject<HTMLDivElement>,
    refs: HeroAnimationRefs
) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            console.log("[GSAP] Context Initialized");

            // 1. Box Appearance
            if (refs.cinemaBox.current) {
                gsap.fromTo(
                    refs.cinemaBox.current,
                    { opacity: 0, y: 150, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 85%",
                            end: "top 60%",
                            scrub: 1,
                        },
                    },
                );
            }

            // --- Timer Functions ---
            const playFastTimer = () => {
                console.log("[Timer] ▶️ START (0.00s -> 0.50s)");
                if (refs.fastTimer.current) {
                    gsap.fromTo(
                        refs.fastTimer.current,
                        { textContent: 0 },
                        {
                            textContent: 0.5,
                            duration: 0.6,
                            ease: "none",
                            snap: { textContent: 0.01 },
                            overwrite: true,
                            onUpdate: function () {
                                this.targets()[0].textContent =
                                    parseFloat(this.targets()[0].textContent).toFixed(2) + "s";
                            },
                        },
                    );
                }
            };

            const resetFastTimer = (source: string) => {
                console.log(`[Timer] ⏹️ RESET by ${source}`);
                if (refs.fastTimer.current) {
                    gsap.killTweensOf(refs.fastTimer.current);
                    refs.fastTimer.current.textContent = "0.00s";
                }
            };

            // 2. Pinning & Sequence
            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "+=200%",
                    pin: true,
                    scrub: true,
                    anticipatePin: 1,
                    onEnter: () => {
                        console.log("[Video] Pin Enter (Play Video)");
                        refs.video.current?.play();
                    },
                    onLeaveBack: () => {
                        console.log("[Video] Leave Back (Pause Video)");
                        if (refs.video.current) {
                            refs.video.current.pause();
                            refs.video.current.currentTime = 0;
                        }
                    },
                },
            });

            // Initial States
            gsap.set(refs.solutionLayer.current, { autoAlpha: 1 });
            gsap.set(refs.overlay.current, { opacity: 0 });
            gsap.set(refs.videoWrapper.current, { autoAlpha: 0, scale: 0.8, y: 50 });

            // Force text init
            if (refs.fastTimer.current) refs.fastTimer.current.textContent = "0.00s";

            pinTl
                .to(refs.problemLayer.current, {
                    scale: 0.95,
                    duration: 1.5,
                    ease: "power1.inOut",
                })
                .to(
                    refs.overlay.current,
                    { opacity: 1, duration: 0.6, ease: "sine.inOut" },
                    "<",
                )
                .to(
                    refs.videoWrapper.current,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: "back.out(1.2)",

                        onStart: () => {
                            console.log("[Anim] Video Scaling STARTED -> Timer GO!");
                            if (refs.fastTimer.current)
                                refs.fastTimer.current.textContent = "0.00s";
                            playFastTimer();
                        },

                        onComplete: () => {
                            console.log("[Anim] Video Scaling COMPLETED");
                        },

                        onReverseComplete: () => {
                            console.log("[Anim] Video Scaling REVERSED");
                            resetFastTimer("Reverse Complete");
                        },
                    },
                    "<0.5",
                );

            // 3. Slow Timer (12.0s)
            if (refs.slowTimer.current) {
                gsap.fromTo(
                    refs.slowTimer.current,
                    { textContent: 0 },
                    {
                        textContent: 12.0,
                        duration: 10,
                        ease: "none",
                        snap: { textContent: 0.01 },
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            end: "bottom top",
                            toggleActions: "play reset play reset",
                        },
                        onUpdate: function () {
                            this.targets()[0].textContent =
                                parseFloat(this.targets()[0].textContent).toFixed(2) + "s";
                        },
                    },
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef, refs]); // Added refs to dependency array just in case, though they are usually stable.
};
