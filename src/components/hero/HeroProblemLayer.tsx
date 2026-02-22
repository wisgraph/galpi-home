import React from "react";
import VideoMask from "../common/VideoMask";
import Typewriter from "../common/Typewriter";

interface HeroProblemLayerProps {
  layerRef: React.RefObject<HTMLDivElement>;
  timerRef: React.RefObject<HTMLDivElement>;
}

const HeroProblemLayer: React.FC<HeroProblemLayerProps> = ({
  layerRef,
  timerRef,
}) => {
  return (
    <div
      ref={layerRef}
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden w-full h-full"
    >
      <div className="absolute top-0 left-0 inset-0 opacity-90 w-full h-full">
        {/* Finder Video with the new VideoMask Component */}
        <VideoMask
          src="/assets/images/hero_finder_search_file.mov"
          className="absolute top-[15%] left-[10%] w-[720px] shadow-lg rounded-2xl"
          crop={{ top: 3.8, bottom: 7.4, left: 5.5, right: 5.5 }}
        />
        {/* Browser Video with the new VideoMask Component */}
        <VideoMask
          src="/assets/images/hero_browser_search.mov"
          className="w-[780px] absolute bottom-[15%] right-[10%] shadow-xl rounded-2xl"
          crop={{ top: 3.8, bottom: 7.4, left: 5.5, right: 5.5 }}
        />
      </div>
      <div className="relative z-10 text-center">
        <div className="bg-black/40 backdrop-blur-xl px-12 py-8 rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <div
            ref={timerRef}
            className="text-6xl md:text-8xl font-mono font-bold text-slate-400 dark:text-slate-600 tabular-nums tracking-tighter"
          >
            0.00s
          </div>
          <Typewriter
            text="Still Searching..."
            className="text-slate-500 dark:text-slate-500 text-lg font-medium tracking-widest uppercase mt-4"
            cursorClassName="bg-slate-500/0"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroProblemLayer;
