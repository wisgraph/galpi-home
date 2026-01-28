import React from 'react';
import { motion } from 'framer-motion';
import { Hash, Zap, Plus, MousePointerClick, Edit3, Sparkles, FilterX } from 'lucide-react';

const ContextTags: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-pink-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-slate-50 dark:from-pink-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap size={12} />
                            태그 입력 가속화
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            컨텍스트 태그
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "검색 필터가 아닙니다. <br className="hidden md:block" /> 태그 입력을 10배 더 빠르게 만드는 도구입니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro / Problem Statement */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">태그 입력의 피로도</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            수많은 링크에 태그를 일일이 타이핑하는 것은 고통스러운 작업입니다.
                            프로젝트 이름을 매번 검색 창이나 입력 칸에 치는 대신, 단 한 번의 클릭으로 해결하세요.
                        </p>
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-start gap-3">
                            <FilterX className="text-rose-500 shrink-0 mt-1" size={20} />
                            <p className="text-sm text-rose-700 dark:text-rose-300">
                                <strong>중요:</strong> 컨텍스트 태그는 검색 결과 필터링을 수행하지 않습니다. 필터링이 작동하면 태그가 없는 아이템들이 사라져서 태그를 추가할 기회조차 없어지기 때문입니다.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-black rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                <span className="text-xs font-bold text-slate-400">HOOK ITEM</span>
                                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded" />
                                <div className="flex gap-1">
                                    <div className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-md text-[10px] text-slate-500">#work</div>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="px-2 py-0.5 bg-pink-500 text-white rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                        <Plus size={8} /> project:alpha
                                    </motion.div>
                                </div>
                            </div>
                            <p className="text-center text-xs text-slate-400">리스트에서 즉시 태그 추가 버튼이 활성화됩니다.</p>
                        </div>
                    </div>
                </section>

                {/* Core Mechanism */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400">
                            <MousePointerClick size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">주요 특징</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                                <Plus size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">원클릭 태그 자동 추가</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                컨텍스트 태그가 설정되어 있으면, 모든 훅 아이템의 태그 리스트 끝에 <strong>"+태그"</strong> 버튼이 생깁니다. 클릭 한 번으로 태그가 주입되며, 수동으로 이름을 바꿀 필요가 없습니다.
                            </p>
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">자료 정리의 극대화</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                미분류 자료를 빠르게 훑으며 클릭만 하세요. 타이핑 없이도 수백 개의 자료를 특정 프로젝트 맥락으로 편입시킬 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mechanic Details */}
                <section className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">왜 필터링을 하지 않나요?</h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                일반적인 태그 검색은 해당 태그가 <strong>이미 있는</strong> 아이템만 보여줍니다.
                                하지만 컨텍스트 태그의 목적은 태그가 <strong>없는</strong> 아이템에 태그를 쉽게 붙여주는 것입니다.
                            </p>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">✓</div>
                                    <span>모든 아이템을 보면서 필요한 것만 골라 태그 추가</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">×</div>
                                    <span>태그로 필터링되어 대상을 찾지 못하는 상황 방지</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                            <h4 className="text-pink-400 font-bold mb-4 flex items-center gap-2">
                                <Edit3 size={16} /> Workflow Logic
                            </h4>
                            <div className="space-y-3 font-mono text-xs text-slate-400">
                                <div className="flex gap-2">
                                    <span className="text-pink-500 font-bold">SET</span>
                                    <span>CONTEXT_TAG = "#project:hooklink"</span>
                                </div>
                                <div className="flex gap-2 border-l border-slate-700 pl-4 py-2">
                                    <span>- List all hooks without filtering</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-pink-500 font-bold">ON_CLICK</span>
                                    <span>Append CONTEXT_TAG to HookItem</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "손이 기억하게 하지 마세요. <br /> 클릭 한 번에 맥락을 맡기세요."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default ContextTags;
