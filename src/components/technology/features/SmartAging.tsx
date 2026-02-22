import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trash2, Zap, ArrowDown, History, RefreshCcw } from 'lucide-react';

const SmartAging: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-orange-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-slate-50 dark:from-orange-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Clock size={12} />
                            유지보수 제로 (Zero Maintenance)
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            스마트 에이징 알고리즘
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "중요한 것은 선명하게,<br className="hidden md:block" /> 오래된 것은 흐릿하게."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">링크가 쌓였을 때의 문제점 (Link Clutter)</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        1년 전에 끝난 프로젝트 파일이 검색창 맨 위에 뜨시나요?
                        <br />
                        HookLink는 검색 엔진에 <strong>"시간의 개념"</strong>을 도입하여 이 문제를 해결했습니다.
                    </p>
                </section>

                {/* Mechanism */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl">
                    <div className="text-center mb-10">
                        <div className="inline-block bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-xl font-mono text-sm md:text-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-inner">
                            Final Score = Relevance × <span className="text-orange-500 font-bold">Time Factor</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 relative">
                        {/* Divider */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">최신성 부스트 (Recency Boost)</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                                최근 <strong>24시간 이내</strong>에 사용한 링크는 점수에 <strong className="text-orange-500">1.5배 가산점</strong>을 받습니다. 키워드가 조금 부정확해도, 어제 쓴 파일이라면 최상단에 꽂힙니다.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                                <History size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">자연스러운 감쇠 (Natural Decay)</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                                <strong>6개월 이상</strong> 열지 않은 링크는 점수가 <strong className="text-slate-500">30% 수준</strong>으로 낮아집니다. 삭제되진 않지만, 검색 결과의 바닥으로 조용히 가라앉습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* UX Benefits */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <RefreshCcw size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">언제나 신선한 이유 (Feels Fresh)</h2>
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
                            <RefreshCcw className="w-8 h-8 text-emerald-500 mb-4" />
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">유지보수 제로</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">별도 '아카이브' 버튼을 누를 필요가 없습니다. 그냥 쓰면 알아서 정리됩니다.</p>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">기능</th>
                                <th className="px-6 py-4">기존 런처</th>
                                <th className="px-6 py-4 text-orange-600 dark:text-orange-400">HookLink</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="bg-white dark:bg-black">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">랭킹 기준</td>
                                <td className="px-6 py-4 text-slate-500">단순 텍스트 매칭</td>
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">텍스트 + 시간 (Time Factor)</td>
                            </tr>
                            <tr className="bg-white dark:bg-black">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">오래된 파일</td>
                                <td className="px-6 py-4 text-slate-500">여전히 상단 노출 (방해됨)</td>
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">알아서 하단으로 침전</td>
                            </tr>
                            <tr className="bg-white dark:bg-black">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">관리 방식</td>
                                <td className="px-6 py-4 text-slate-500">수동 아카이브 필요</td>
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">자동 (Automatic)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </main>
        </div>
    );
};

export default SmartAging;
