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
                            Assistive Neural Network
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            신경망 자동완성 <br className="md:hidden" />
                            <span className="text-purple-600 dark:text-purple-400 italic">(Neural Autocomplete)</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            단순한 텍스트 완성이 아닙니다. <br className="hidden md:block" />
                            당신의 워크플로우를 학습하는 지능형 엔진입니다.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                        <code>#pro</code>를 입력하면 당신이 지금 가장 필요로 할 <code>#project:antigravity</code>를 우선순위로 띄웁니다.
                        갈피는 당신의 사용 패턴을 분석해 가장 적합한 맥락을 <strong>실시간으로</strong> 연결합니다.
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
                                        Neural Suggestion
                                    </div>
                                    <div className="p-1">
                                        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold flex justify-between items-center cursor-pointer">
                                            <span>#project:antigravity</span>
                                            <span className="text-[10px] opacity-50 px-1.5 py-0.5 rounded border border-purple-300">Enter</span>
                                        </div>
                                        <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex justify-between items-center cursor-pointer">
                                            <span>#project:galpi</span>
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
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">패턴 학습 (Pattern Learning)</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            당신이 어떤 프로젝트에서 갈피를 가장 많이 사용하는지 압니다. 고민할 필요 없이 <code>Tab</code>만 누르세요. 엔진이 당신의 다음 행동을 미리 준비합니다.
                        </p>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-black shadow-sm flex items-center justify-center text-slate-900 dark:text-white mb-6">
                            <Keyboard size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Zero Friction</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            방향키와 <code>Tab</code>, <code>Enter</code>면 충분합니다. 마우스를 찾는 찰나의 시간조차 아까운 분들을 위한 극단적인 키보드 인터페이스를 지향합니다.
                        </p>
                    </div>
                </section>

                {/* Pro Tip */}
                <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                            <Command size={12} />
                            Pro Workflow
                        </div>
                        <h2 className="text-3xl font-black mb-6">컨텍스트 즉시 전환 (Focus)</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-indigo-100 leading-relaxed mb-6 font-medium">
                                    단순히 결과를 보는 게 아니라, 작업의 '판'을 바꿉니다.<br />
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
                                    <div className="text-2xl font-black">Cmd + Enter</div>
                                    <p className="mt-2 text-xs text-indigo-200">검색 모드 → 작업 모드 즉시 전환</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "지능형 도구는 당신의 생각을 방해하지 않고 보조해야 합니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default TagAutocomplete;
