import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Variable, Cpu, Sparkles, Gauge } from 'lucide-react';

const SearchEngine: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-slate-50 dark:from-blue-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Gauge size={12} />
                            Korean Optimized
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            한국어 사용자에게 <br className="md:hidden" />
                            가장 <span className="text-blue-600 dark:text-blue-400 italic">이기적인</span> 검색 엔진
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            해외 생산성 도구들을 쓰며 답답하셨죠? <br className="hidden md:block" />
                            영문 오타조차 당신의 '의도'로 읽어냅니다.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Performance Stats */}
                <section className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">1ms</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">Cold Start</div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">0.02s</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">Query Time (100k items)</div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">5MB</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">Memory Footprint</div>
                    </div>
                </section>

                {/* Main Features */}
                <section className="space-y-16">
                    {/* Chosung Search */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Sparkles size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">초성 검색 (Choseong Search)</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                <strong>"ㄱㅎㅇ"</strong>라고만 치세요. <code>2026_기획안.pdf</code>를 즉시 소환합니다. <br />
                                파일명뿐만 아니라 태그조차 초성으로 잡아냅니다. <strong>#ㅎㄹ</strong>만 쳐도 <strong>#hooklink</strong>가 튀어나옵니다.
                            </p>
                            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="px-3 py-1 bg-white dark:bg-black rounded border border-slate-300 dark:border-slate-700 font-mono text-blue-500 font-bold">ㄱㅎㅇ</div>
                                    <div className="text-slate-400">→</div>
                                    <div className="text-slate-900 dark:text-white font-medium">2026_기획안.pdf</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="px-3 py-1 bg-white dark:bg-black rounded border border-slate-300 dark:border-slate-700 font-mono text-blue-500 font-bold">#ㅎㄹ</div>
                                    <div className="text-slate-400">→</div>
                                    <div className="text-slate-900 dark:text-white font-medium">#hooklink</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fuzzy Matching */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">퍼지 매칭 (Fuzzy Matching)</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                한영 전환을 깜빡해서 <code>rhlghldks</code>라고 치고 지우기를 반복했나요? <br />
                                <code>hklk</code>라고 대충 쳐도 <code>HookLink</code>를 찾아냅니다. 당신의 오타 속에 숨겨진 <strong>'의도'</strong>를 파악합니다. 정확할 필요 없습니다. 대충 던져도 찰떡같이 알아듣습니다.
                            </p>
                        </div>
                    </div>

                    {/* In-Memory */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">빛의 속도, 인메모리 아키텍처</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                모든 인덱스는 RAM 위에서 빛의 속도로 스캔됩니다. 엔터(Enter)를 치기도 전에, 결과는 이미 화면에 떠 있습니다. 디스크를 긁는 소모적인 작업은 갈피에 없습니다.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "단 1초도 낭비하지 마세요. 당신의 시간은 비쌉니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default SearchEngine;
