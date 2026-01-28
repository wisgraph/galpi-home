import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroProblemLayer from "./HeroProblemLayer";
import HeroSolutionLayer from "./HeroSolutionLayer";

gsap.registerPlugin(ScrollTrigger);

const HeroCinematicSection: React.FC = () => {
  // --- Refs Definition ---
  const containerRef = useRef<HTMLDivElement>(null);
  const cinemaBoxRef = useRef<HTMLDivElement>(null);

  // Child Refs (Passed down as props)
  const problemLayerRef = useRef<HTMLDivElement>(null);
  const solutionLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const slowTimerRef = useRef<HTMLDivElement>(null);
  const fastTimerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- Animation Logic ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Box Appearance (Slide Up)
      gsap.fromTo(
        cinemaBoxRef.current,
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

      // 2. Pinning & Transition Sequence
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=200%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onEnter: () => videoRef.current?.play(),
        },
      });

      // Initial States
      gsap.set(solutionLayerRef.current, { autoAlpha: 1 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(videoWrapperRef.current, { autoAlpha: 0, scale: 0.8, y: 50 });

      // Sequence
      pinTl
        .to(problemLayerRef.current, {
          scale: 0.95,
          duration: 1.5,
          ease: "power1.inOut",
        })
        .to(
          overlayRef.current,
          { opacity: 1, duration: 0.6, ease: "sine.inOut" },
          "<",
        )
        .to(
          videoWrapperRef.current,
          { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.2)" },
          "<0.5",
        );

      // 3. Timers
      if (slowTimerRef.current) {
        gsap.to(slowTimerRef.current, {
          textContent: 12.0,
          duration: 10,
          ease: "none",
          snap: { textContent: 0.01 },
          scrollTrigger: { trigger: containerRef.current, start: "top bottom" },
          onUpdate: function () {
            this.targets()[0].textContent =
              parseFloat(this.targets()[0].textContent).toFixed(2) + "s";
          },
        });
      }
      if (fastTimerRef.current) {
        gsap.to(fastTimerRef.current, {
          textContent: 0.5,
          duration: 1.0,
          ease: "power2.out",
          snap: { textContent: 0.01 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            toggleActions: "restart none none reverse",
          },
          onUpdate: function () {
            this.targets()[0].textContent =
              parseFloat(this.targets()[0].textContent).toFixed(2) + "s";
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-20 bg-slate-50/50 dark:bg-black/20"
    >
      <div
        ref={cinemaBoxRef}
        className="relative max-w-6xl mx-auto h-[600px] md:h-[700px] perspective-1000"
      >
        <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl">
          {/* Layer 1: Chaos */}
          <HeroProblemLayer
            layerRef={problemLayerRef}
            timerRef={slowTimerRef}
          />

          {/* Layer 2: Solution */}
          <HeroSolutionLayer
            layerRef={solutionLayerRef}
            overlayRef={overlayRef}
            wrapperRef={videoWrapperRef}
            videoRef={videoRef}
            timerRef={fastTimerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCinematicSection;
