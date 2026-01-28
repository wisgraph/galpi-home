import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Brain, Network, Sparkles, Target, Compass } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const AboutPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950"
        >
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-violet-100 via-white to-white dark:from-violet-900/20 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-300/30 to-pink-300/30 dark:from-violet-500/20 dark:to-pink-500/20 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
                                <BookMarked size={16} />
                                갈피의 의미
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                <span className="text-slate-900 dark:text-white">
                                    갈피,
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    생각의 네비게이션
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                잃어버린 맥락을 되찾고, 생각의 흐름을 이어가는 도구
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 명칭의 의미 */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                                갈피란?
                            </h2>

                            <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 mb-8">
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4">
                                            사전적 의미
                                        </h3>
                                        <div className="space-y-4 text-slate-700 dark:text-slate-300">
                                            <p className="text-lg leading-relaxed">
                                                <strong className="text-slate-900 dark:text-white">1.</strong> 일이나 사물의 <span className="text-violet-600 dark:text-violet-400 font-semibold">갈래가 구별되는 어름</span>
                                            </p>
                                            <p className="text-base text-slate-500 dark:text-slate-400 pl-6 italic">
                                                "갈피를 못 잡겠다" 할 때의 그 갈피
                                            </p>
                                            <p className="text-lg leading-relaxed mt-6">
                                                <strong className="text-slate-900 dark:text-white">2.</strong> 겹치거나 포갠 물건의 <span className="text-violet-600 dark:text-violet-400 font-semibold">하나하나의 사이</span>. 또는 그 틈
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200 dark:border-violet-500/30">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/50">
                                            <Compass className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">갈피를 못 잡는다는 것</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                틈, 어떤 사이인지를 인지하지 못한다는 것. 맥락적 흐름의 적절한 위치를 놓치고 있다는 의미입니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-500/30">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-900/50">
                                            <Brain className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">작업 기억과의 연결</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                인간의 단기 기억 용량을 넘어서면 맥락을 잃어버립니다. 갈피는 그 잃어버린 맥락을 되찾게 합니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 철학 */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
                                철학
                            </h2>

                            <div className="space-y-8">
                                <div className="relative pl-8 border-l-4 border-violet-500 dark:border-violet-400">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        맥락을 잃지 않는 작업 환경
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                        우리는 매일 수많은 정보 사이를 오갑니다. 문서를 읽다가 웹사이트를 확인하고,
                                        이메일을 보내다가 다시 문서로 돌아옵니다. 이 과정에서 우리는 종종
                                        <span className="text-violet-600 dark:text-violet-400 font-semibold"> "내가 뭘 하고 있었지?"</span> 하는 순간을 맞이합니다.
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        갈피는 이 잃어버린 맥락을 되찾게 합니다. 컨텍스트로 묶인 문서 중 하나만 잘 캡처해도,
                                        관련된 모든 자료를 빠짐없이 회복할 수 있습니다.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-4 border-pink-500 dark:border-pink-400">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        타입드 태그 시스템
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                        단순한 태그가 아닙니다. <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm">#project:갈피</code>처럼
                                        타입과 값을 가진 구조화된 태그로, 맥락을 더 정확하게 표현합니다.
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        이 태그들은 자동 검색 기능과 결합되어, 현재 보고 있는 문서의 맥락을 감지하고
                                        관련된 모든 자료를 즉시 제안합니다.
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-4 border-cyan-500 dark:border-cyan-400">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        작업 기억의 확장
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        인간의 작업 기억(Working Memory)은 제한적입니다.
                                        심리학 연구에 따르면 우리는 동시에 약 7±2개의 정보만 기억할 수 있습니다.
                                    </p>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                                        갈피는 이 한계를 극복합니다. 특정 정보들을 메모리에 올려놓고 재사용하는 작업 기억의 역할을,
                                        디지털 공간에서 무한히 확장합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 비전 */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
                                    <Target size={16} />
                                    Vision
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                    생각의 네비게이션
                                </h2>
                            </div>

                            <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 border border-violet-200 dark:border-violet-500/30">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg">
                                            <Network className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                위상학적 태그 시각화
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                태그 시스템을 단순한 목록이 아닌, <span className="font-semibold text-violet-600 dark:text-violet-400">위상학적 구조</span>로 시각화합니다.
                                                생각의 연결 관계를 공간적으로 이해하고, 새로운 통찰을 발견할 수 있습니다.
                                            </p>
                                            <div className="mt-3 inline-flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400">
                                                <Sparkles size={14} />
                                                <span className="font-medium">로드맵에 포함됨</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg">
                                            <Compass className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                지식 탐색의 새로운 패러다임
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                파일을 찾는 것이 아니라, <span className="font-semibold text-pink-600 dark:text-pink-400">생각의 흐름을 탐색</span>합니다.
                                                갈피는 단순한 파일 관리자가 아닌, 당신의 지식 네트워크를 항해하는 나침반이 되고자 합니다.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-violet-200 dark:border-violet-500/30">
                                        <p className="text-lg text-center text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                            "우리는 정보를 저장하는 것이 아니라, <br className="hidden md:block" />
                                            <span className="text-violet-600 dark:text-violet-400 font-bold">생각의 맥락을 보존</span>합니다."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                갈피와 함께 시작하세요
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                잃어버린 맥락을 되찾고, 생각의 흐름을 이어가는 새로운 방법
                            </p>
                            <motion.a
                                href="/pricing"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
                            >
                                <BookMarked className="w-5 h-5" />
                                지금 시작하기
                            </motion.a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default AboutPage;
