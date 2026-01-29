import React from "react";

const PersonaHeader: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950" />
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8">
          단순히 파일과 웹페이지를 저장만 하는 <br />
          <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
            분들에게 갈피는 필요 없습니다
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          갈피는 오직 <strong className="text-slate-900 dark:text-white font-bold underline decoration-violet-500/50">'지식의 연결'이 부가가치인 분들</strong>을 위해 설계되었습니다.<br />
          지적 생산을 하는 전문가들의 고통을 <span className="text-violet-600 dark:text-violet-400 font-black italic">0.1초의 쾌감</span>으로 바꿉니다.
        </p>
      </div>
    </div>
  );
};

export default PersonaHeader;
