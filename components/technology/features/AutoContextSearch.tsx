import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Cpu, Brain, Repeat, Settings2, Sparkles } from 'lucide-react';

const AutoContextSearch: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-slate-50 dark:from-purple-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={12} />
                            작업 기억의 복원
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            자동 맥락 감지
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "문서를 여는 순간, <br className="hidden md:block" /> 과거의 작업실이 그대로 소환됩니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Core Concept */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">맥락의 자동 완성</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            현재 보고 있는 문서가 이미 HookLink에 등록된 항목이라면, 시스템은 그 안에 담긴 태그(예: <code>#project:A</code>)를 즉시 감지합니다.
                            그리고 검색창에 해당 태그를 자동으로 입력하여 같은 맥락에 있는 모든 자료를 리스트업합니다.
                        </p>
                        <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 flex items-start gap-4">
                            <Brain className="text-purple-500 shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">작업 기억(Working Memory)의 외주화</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    "저번에 이 문서랑 같이 봤던 웹사이트가 뭐였지?" 고민할 필요가 없습니다. HookLink가 여러분의 작업 기억을 대신 보존하고 연결해 줍니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800">
                                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs font-mono">PDF</div>
                                <div className="flex-1">
                                    <div className="text-[10px] text-slate-400 uppercase">Current Document</div>
                                    <div className="text-xs font-bold text-slate-700 dark:text-white truncate">2026_기획안_v2.pdf</div>
                                </div>
                                <div className="px-2 py-0.5 bg-purple-500 text-white rounded text-[10px] font-bold">#project:A</div>
                            </div>

                            <div className="flex justify-center py-2 text-purple-500 animate-bounce">
                                <Repeat size={20} />
                            </div>

                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 border-dashed">
                                <div className="text-[10px] text-purple-400 font-bold uppercase mb-2">Auto-Filtered Search Results</div>
                                <div className="space-y-2 opacity-60">
                                    <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-3/4" />
                                    <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-1/2" />
                                    <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-2/3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Cpu size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">더 유연한 양방향 연결</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">태그 기반의 자유도</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                훅마크(Hookmark)의 강력한 양방향 링크 시스템을 HookLink만의 방식으로 재해석했습니다. 복잡한 1:1 연결 테이블이 아닌, <strong>'태그 기반의 맥락 그룹'</strong>을 사용하므로 훨씬 더 쉽고 자유롭게 방대한 지식을 엮을 수 있습니다.
                            </p>
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 text-indigo-500">
                                <Settings2 size={24} />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">사용자 정의 맥락 태그</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                맥락 감지에 사용될 기본 태그 속성은 언제든 변경 가능합니다. 기본값인 <code>project</code> 외에도 사용자가 정의한 <code>area</code>, <code>topic</code> 등 원하는 태그 키를 맥락의 기준으로 설정할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "HookLink는 당신이 멈췄던 그 지점을 기억합니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default AutoContextSearch;
