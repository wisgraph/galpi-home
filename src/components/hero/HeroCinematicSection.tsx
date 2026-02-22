import React, { useRef } from "react";
import HeroProblemLayer from "./HeroProblemLayer";
import HeroSolutionLayer from "./HeroSolutionLayer";
import { useHeroAnimation } from "../../hooks/useHeroAnimation";

const HeroCinematicSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cinemaBoxRef = useRef<HTMLDivElement>(null);
  const problemLayerRef = useRef<HTMLDivElement>(null);
  const solutionLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const slowTimerRef = useRef<HTMLDivElement>(null);
  const fastTimerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useHeroAnimation(containerRef, {
    cinemaBox: cinemaBoxRef,
    problemLayer: problemLayerRef,
    solutionLayer: solutionLayerRef,
    overlay: overlayRef,
    videoWrapper: videoWrapperRef,
    slowTimer: slowTimerRef,
    fastTimer: fastTimerRef,
    video: videoRef,
  });

  return (
    <div ref={containerRef} className="relative w-full py-20">
      <div
        ref={cinemaBoxRef}
        className="relative w-full mx-auto h-screen perspective-1000"
      >
        <div className="relative w-full h-full overflow-hidden">
          <HeroProblemLayer
            layerRef={problemLayerRef}
            timerRef={slowTimerRef}
          />
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
