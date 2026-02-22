import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowUp, Star, Calculator, ArrowDown } from 'lucide-react';

const RankingAlgorithm: React.FC = () => {
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
                            중력 모델 (Gravity Model)
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            랭킹 알고리즘<br />(The Ranking Algorithm)
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "흐르는 물(Recency)과<br className="hidden md:block" /> 단단한 바위(Importance)의 조화."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Concept */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">딜레마 (The Conflict)</h2>
                        <div className="space-y-4">
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-blue-500 shadow-sm">
                                <p className="font-medium text-slate-900 dark:text-white mb-1">첫 번째 욕구</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">"방금 작업하던 파일(최신성)을 바로 열고 싶어."</p>
                            </div>
                            <div className="flex justify-center text-slate-400"><span className="text-xs font-bold uppercase tracking-widest">Vs</span></div>
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-amber-500 shadow-sm">
                                <p className="font-medium text-slate-900 dark:text-white mb-1">두 번째 욕구</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">"1년 전 파일이라도, 정말 중요한(중요도) 건 맨 위에 있어야 해."</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        이 두 가지 상충되는 욕구를 동시에 만족시키기 위해, HookLink는 물리학의 <strong>"중력 모델(Gravity Model)"</strong>을 차용했습니다.
                    </div>
                </section>

                {/* Formula Visualization */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl" />

                    <div className="text-center mb-12 relative z-10">
                        <div className="inline-flex items-center gap-2 mb-4 text-indigo-400 font-mono text-sm">
                            <Calculator size={16} /> 공식 (The Formula)
                        </div>
                        <div className="text-xl md:text-3xl font-mono bg-white/5 inline-block px-6 py-4 rounded-xl border border-white/10">
                            Score = (<span className="text-amber-400">Mass</span> + <span className="text-blue-400">Usage</span>) × <span className="text-emerald-400">Time</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-amber-400">
                                <Star size={24} fill="currentColor" />
                                <h3 className="text-xl font-bold">Mass (질량)</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                사용자가 설정한 **중요도(★ 1~10)**는 파일의 '질량'입니다. 질량이 클수록 존재감이 뚜렷하며, 쉽게 움직이지 않습니다.
                            </p>
                            <ul className="text-xs text-slate-400 space-y-2">
                                <li>• 가중치 1점 = 기본 점수 10,000점</li>
                                <li>• 중요 파일은 사소한 파일에 절대 밀리지 않음</li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                <ArrowDown size={24} />
                                <h3 className="text-xl font-bold">Gravity (중력)</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                시간은 모든 사물을 아래로 끌어당기는 '중력'입니다.
                            </p>
                            <ul className="text-xs text-slate-400 space-y-2">
                                <li>• <span className="text-white font-bold">Yesterday:</span> ×1.5 Booster (반중력)</li>
                                <li>• <span className="text-white font-bold">Old Files:</span> ×0.3 Decay (침전)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Simulation Scenarios */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-4">시뮬레이션 (Simulations)</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Sim 1 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                🌊 시뮬레이션 1: 일상적인 파일 (흐르는 물)
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                                    <span>어제 쓴 메모 (★1)</span>
                                    <span className="text-emerald-600 font-bold flex items-center gap-1"><ArrowUp size={12} /> Top Rank</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 opacity-60">
                                    <span>작년 보고서 (★2)</span>
                                    <span className="text-slate-500 flex items-center gap-1"><ArrowDown size={12} /> Low Rank</span>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                                가중치가 비슷하다면 최신성이 승리합니다. 사용자는 항상 "지금 작업 중인 파일"을 먼저 보게 됩니다.
                            </p>
                        </div>

                        {/* Sim 2 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                🪨 시뮬레이션 2: 중요 파일 (단단한 바위)
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded border border-amber-200 dark:border-amber-800">
                                    <span className="font-bold text-amber-800 dark:text-amber-200">마스터 플랜 (★8)</span>
                                    <span className="text-amber-600 font-bold">Fixed Top 👑</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                                    <span>어제 쓴 메모 (★1)</span>
                                    <span className="text-slate-500">2nd Rank</span>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                                압도적인 질량(중요도)을 가진 파일은 시간이 지나도 가라앉지 않고 상단을 지킵니다. (구명조끼 효과)
                            </p>
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

export default RankingAlgorithm;
