import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Download, Play, ChevronDown } from "lucide-react";

const HeroTextSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  // Ref 배열 헬퍼 함수
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 초기 상태: 숨김
      gsap.set(elementsRef.current, { opacity: 0, y: 30 });

      // 순차 등장 애니메이션
      gsap.to(elementsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2, // 0.2초 간격으로 하나씩 등장
        delay: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-10"
    >
      {/* 배경 효과 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-violet-400/20 dark:bg-violet-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p
          ref={addToRefs}
          className="text-sm md:text-base font-bold text-violet-500 uppercase tracking-[0.2em] mb-6"
        >
          가장 낡은 습관에게 작별을
        </p>

        <h1
          ref={addToRefs}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white"
        >
          찾지 말고, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400">
            부르세요.
          </span>
        </h1>

        <p
          ref={addToRefs}
          className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          마우스는 잠시 내려두세요. 당신이 필요한 자료를 <br />
          <strong className="text-slate-900 dark:text-white font-semibold relative inline-block">
            0.5초
            <span className="absolute bottom-0 left-0 w-full h-1 bg-violet-500/30"></span>
          </strong>
          만에 소환합니다.
        </p>

        <div
          ref={addToRefs}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/pricing"
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-violet-500/20 flex items-center gap-2"
          >
            <Download size={20} /> 갈피 시작하기
          </Link>
          <Link
            to="/how-it-works"
            className="px-8 py-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-2"
          >
            <Play size={18} className="text-violet-500" /> 작동 원리
          </Link>
        </div>
      </div>

      {/* 스크롤 유도 아이콘 */}
      <div
        ref={addToRefs}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50"
      >
        <ChevronDown className="text-slate-400 dark:text-slate-600" size={32} />
      </div>
    </div>
  );
};

export default HeroTextSection;
