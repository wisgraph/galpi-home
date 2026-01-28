import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Command, Keyboard, Zap, Hash, ArrowRight } from 'lucide-react';

const TagAutocomplete: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-slate-50 dark:from-purple-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-1/2 right-0 w-[400px] h-[800px] bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={12} />
                            보조 지능
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            지능형 태그 자동완성
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "태그를 입력하는 순간,<br className="hidden md:block" /> 당신의 데이터 지도가 완성됩니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Hooklink의 자동완성은 단순한 텍스트 제안이 아닙니다.
                        당신의 워크플로우를 이해하고, 가장 적합한 맥락을 <strong>실시간으로</strong> 연결해주는 신경망입니다.
                    </p>
                </section>

                {/* Main Feature UI */}
                <section className="bg-slate-200 dark:bg-slate-900 p-1 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-white dark:bg-black rounded-[1.3rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl" />

                        <div className="max-w-xl mx-auto relative z-10">
                            {/* Search Bar Mockup */}
                            <div className="relative mb-6">
                                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 border border-purple-500/50 rounded-xl shadow-[0_0_0_4px_rgba(168,85,247,0.1)]">
                                    <span className="text-slate-400">Search...</span>
                                    <span className="text-slate-900 dark:text-white font-medium">#pro</span>
                                    <span className="w-0.5 h-5 bg-purple-500 animate-pulse" />
                                </div>

                                {/* Autocomplete Dropdown */}
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                                    <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Suggestions
                                    </div>
                                    <div className="p-1">
                                        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium flex justify-between items-center cursor-pointer">
                                            <span>#project:antigravity</span>
                                            <span className="text-xs opacity-50">Enter</span>
                                        </div>
                                        <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex justify-between items-center cursor-pointer">
                                            <span>#project:hooklink</span>
                                        </div>
                                        <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex justify-between items-center cursor-pointer">
                                            <span>#protocol</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-black shadow-sm flex items-center justify-center text-slate-900 dark:text-white mb-6">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">퍼지 매칭 (Fuzzy Matching)</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            오타가 있어도 괜찮습니다. `prjct`만 입력해도 `#project`를 찾아냅니다. 당신의 의도를 파악하여 관련 태그를 우선순위대로 배치합니다.
                        </p>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-black shadow-sm flex items-center justify-center text-slate-900 dark:text-white mb-6">
                            <Keyboard size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">키보드 우선 (Keyboard First)</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            마우스에 손을 올리지 마세요. 방향키와 `Tab`, `Enter`만으로 모든 태그 관리 활동이 가능합니다.
                        </p>
                    </div>
                </section>

                {/* Pro Tip */}
                <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                            <Command size={12} />
                            프로 워크플로우 (Pro Workflow)
                        </div>
                        <h2 className="text-3xl font-bold mb-6">컨텍스트 승격 (Context Promotion)</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-indigo-100 leading-relaxed mb-6">
                                    Hooklink 자동완성만의 독보적인 기능.<br />
                                    자동완성 창에서 태그를 고르고 <br />
                                    <strong className="text-white">Cmd + Enter</strong>를 누르세요.
                                </p>
                                <div className="flex items-center gap-4 text-sm font-mono text-indigo-200">
                                    <span className="px-2 py-1 bg-black/20 rounded">#tag</span>
                                    <ArrowRight size={16} />
                                    <span className="px-2 py-1 bg-white/20 rounded text-white font-bold">Active Context</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="p-6 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <p className="mb-2 text-indigo-100 text-sm">Action</p>
                                    <div className="text-2xl font-bold">Cmd + Enter</div>
                                    <p className="mt-2 text-xs text-indigo-200">검색 모드 → 작업 모드 즉시 전환</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "단 1초도 낭비하지 마세요."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default TagAutocomplete;
