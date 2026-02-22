import VideoMask from "../common/VideoMask";

interface HeroSolutionLayerProps {
  layerRef: React.RefObject<HTMLDivElement>;
  overlayRef: React.RefObject<HTMLDivElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  timerRef: React.RefObject<HTMLDivElement>;
}

const HeroSolutionLayer: React.FC<HeroSolutionLayerProps> = ({
  layerRef,
  overlayRef,
  wrapperRef,
  videoRef,
  timerRef,
}) => {
  return (
    <div
      ref={layerRef}
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      {/* 배경 오버레이 (Fade In 담당) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-none"
      />

      {/* 영상 컨텐츠 (Pop Up 담당) */}
      <div
        ref={wrapperRef}
        className="relative w-full md:w-[60%] rounded-3xl overflow-hidden"
      >
        <VideoMask
          videoRef={videoRef}
          src="/assets/images/hooklink-launcher-demo.mov"
          className="w-full h-auto block shadow-2xl"
          borderRadius="1.45rem"
          crop={{ top: 4.5, bottom: 9.6, left: 7.1, right: 7.1 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-10 py-4 rounded-3xl shadow-2xl mb-6">
            <div
              ref={timerRef}
              className="text-6xl md:text-8xl font-mono font-extrabold text-violet-400 dark:text-violet-300 tabular-nums drop-shadow-lg"
            >
              0.00s
            </div>
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-violet-600 text-white text-xs font-bold tracking-[0.3em] uppercase shadow-lg">
            HookLink Engine
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSolutionLayer;
