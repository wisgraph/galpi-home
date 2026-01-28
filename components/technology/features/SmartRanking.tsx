import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowUp, Star, Calculator, ArrowDown, Clock, Zap, History, RefreshCcw, Trash2 } from 'lucide-react';

const SmartRanking: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-slate-50 dark:from-indigo-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Scale size={12} />
                            중력 및 시간 모델
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            스마트 랭킹 및 에이징
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "중요한 것은 떠오르고,<br className="hidden md:block" /> 오래된 것은 자연스럽게 가라앉습니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro / Dilemma */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">검색의 딜레마</h2>
                        <div className="space-y-4">
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-blue-500 shadow-sm">
                                <p className="font-medium text-slate-900 dark:text-white mb-1">최신성 (Recency)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">"방금 작업하던 파일을 바로 찾고 싶어."</p>
                            </div>
                            <div className="flex justify-center text-slate-400"><span className="text-xs font-bold uppercase tracking-widest">Vs</span></div>
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-amber-500 shadow-sm">
                                <p className="font-medium text-slate-900 dark:text-white mb-1">중요도 (Importance)</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">"1년 전 파일이라도, 핵심 문서는 맨 위에 있어야 해."</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        HookLink는 이 두 가지 상충되는 욕구를 동시에 만족시키기 위해, 물리학의 <strong>"중력 모델(Gravity Model)"</strong>과 <strong>"스마트 에이징(Smart Aging)"</strong>을 결합했습니다.
                    </div>
                </section>

                {/* Formula Visualization */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl" />

                    <div className="text-center mb-12 relative z-10">
                        <div className="inline-flex items-center gap-2 mb-4 text-indigo-400 font-mono text-sm">
                            <Calculator size={16} /> The Formula
                        </div>
                        <div className="text-xl md:text-3xl font-mono bg-white/5 inline-block px-6 py-4 rounded-xl border border-white/10">
                            Score = (<span className="text-amber-400">Mass</span> + <span className="text-blue-400">Usage</span>) × <span className="text-emerald-400">Time Factor</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-amber-400">
                                <Star size={24} fill="currentColor" />
                                <h3 className="text-xl font-bold">Mass (질량)</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                사용자가 설정한 **중요도(★ 1~10)**는 파일의 '질량'입니다. 질량이 클수록 존재감이 뚜렷하며, 쉽게 움직이지 않습니다. 중요 파일은 시간의 흐름을 거스르고 상단을 지킵니다.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                <Clock size={24} />
                                <h3 className="text-xl font-bold">Time (시간)</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                시간은 모든 사물을 아래로 끌어당기는 '중력'과 같습니다. 하지만 최근에 건드린 파일은 '부스트'를 받아 일시적으로 중력을 이겨냅니다.
                            </p>
                            <ul className="text-xs text-slate-400 space-y-2 pl-2 border-l border-slate-700">
                                <li>• <span className="text-white font-bold">Recent 24h:</span> ×1.5 Booster</li>
                                <li>• <span className="text-white font-bold">Old Files:</span> ×0.3 Decay (침전)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Aging Benefits */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <RefreshCcw size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">유지보수 제로 (Zero Maintenance)</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <Trash2 className="w-8 h-8 text-slate-400 mb-4" />
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">자동 청소</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">1년 전 자료가 검색창을 어지럽히지 않도록 자동으로 하단으로 밀어냅니다.</p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <Zap className="w-8 h-8 text-orange-500 mb-4" />
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">즉각적 접근</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">방금 닫은 파일을 다시 열 때, 단축키 한 번이면 100% 확률로 맨 위에 있습니다.</p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <ArrowDown className="w-8 h-8 text-emerald-500 mb-4" />
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">자연스러운 감쇠</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">6개월 이상 열지 않은 링크는 점수가 서서히 낮아지며 검색 결과의 바닥으로 침전합니다.</p>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "HookLink는 당신이 무엇을 중요하게 여기는지<br /> 이미 알고 있습니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default SmartRanking;
