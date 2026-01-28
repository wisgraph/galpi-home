import React from "react";

const PersonaHeader: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50 to-white dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950" />
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
          누구나 자신만의
          <br />
          <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
            '연결'이 필요합니다
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          당신이 겪는 구체적인 고통을 쾌감으로 바꾸는 순간
        </p>
      </div>
    </div>
  );
};

export default PersonaHeader;
