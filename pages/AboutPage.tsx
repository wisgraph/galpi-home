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
            <section className="relative py-20 md:py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-white dark:from-rose-900/10 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-rose-400/20 to-violet-400/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">

                            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                                <span className="text-slate-900 dark:text-white">
                                    갈피를 못 잡겠나요? <br />
                                </span>
                                <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-violet-500 dark:from-rose-400 dark:via-pink-400 dark:to-violet-400 bg-clip-text text-transparent">
                                    당연합니다.
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                                당신의 생각이 끊어지는 '틈'을 메우기 위해,<br className="hidden md:block" />
                                우리는 0.03초의 속도에 집착했습니다.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 사전적 의미 재정의 */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 italic">
                                    "갈피: 겹치거나 포갠 물건의 하나하나의 사이."
                                </h2>
                                <div className="space-y-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <p>
                                        우리의 업무는 수백 개의 파일과 탭이 겹겹이 쌓인 거대한 탑과 같습니다.
                                        그 사이(틈)를 비집고 들어가는 순간, 흐름은 끊기고 집중력은 증발합니다.
                                    </p>
                                    <p className="font-bold text-slate-900 dark:text-white">
                                        갈피(Galpi)는 당신이 놓친 그 '틈'을 메우기 위해 태어났습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 개발자 노트: 0.03초를 위한 엔지니어의 변명 */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-12 text-center tracking-tight">
                                0.03초를 위한 <span className="text-rose-600 dark:text-rose-400 underline decoration-8 decoration-rose-500/20">엔지니어의 변명</span>
                            </h2>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
                                <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
                                    <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200 border-l-4 border-violet-500 pl-4">"솔직히 고백합니다. 저희도 AppleScript를 씁니다."</h3>

                                    <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        <p>
                                            맥(Mac) 생태계에서 앱과 앱 사이를 완벽하게 연결하려면, AppleScript는 피할 수 없는 선택입니다. 경쟁사도, 저희도 마찬가지입니다.
                                        </p>
                                        <p className="font-bold text-slate-900 dark:text-white text-xl">
                                            하지만 '그냥 쓰는 것'과 '깎아서 쓰는 것'은 천지차이입니다.
                                        </p>
                                        <p>
                                            기존 도구들이 거대한 스크립트 덩어리를 통째로 던져 맥을 멈칫하게 만들 때, 갈피는 스크립트를 수술하듯 도려내고 최적화했습니다. 더 나아가, 우리는 OS의 신경망이라 불리는 <strong className="text-rose-600 dark:text-rose-400 font-bold">Accessibility API</strong>를 뚫어 정보를 즉시 낚아챕니다.
                                        </p>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white pt-4">
                                            그 결과 <span className="bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 px-3 py-1 rounded">30ms(0.03초)</span>.
                                            <br className="md:hidden" /> 인간이 인지하기도 힘든 '즉시 반응'을 만들어냈습니다.
                                        </p>
                                        <p className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-8">
                                            이것은 단순한 앱이 아닙니다. '가벼움'과 '속도'에 미친 개발자가 맥(Mac) 사용자에게 바치는 헌사입니다. <strong className="text-slate-900 dark:text-white">당신의 소중한 램(RAM)은 배경 화면에 떠 있는 유틸리티가 아니라, 오직 당신의 창작에만 쓰여야 한다는 집요한 고집의 결과물입니다.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 철학: 당신의 뇌는 죄가 없습니다. */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-16 text-center">
                                당신의 <span className="text-pink-500">뇌는 죄가 없습니다.</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                                        <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-4">밀러의 법칙 (The Magical Number Seven)</h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            인간의 작업 기억(Working Memory) 용량은 고작 7개입니다. 당신의 머리가 나빠서 잊어버리는 것이 아닙니다. 뇌의 용량이 초과되었기 때문입니다.
                                        </p>
                                    </div>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        갈피는 이 생물학적 한계를 기술로 극복합니다. 우리가 만든 태그는 단순한 글자가 아닙니다.
                                    </p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                                        뇌가 놓쳐버린 맥락을 대신 붙잡고 있는 <span className="text-violet-600 dark:text-violet-400">'디지털 시냅스'</span>입니다.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl aspect-square flex items-center justify-center p-1 shadow-2xl shadow-rose-500/20">
                                        <div className="bg-white dark:bg-slate-900 w-full h-full rounded-[20px] flex flex-col items-center justify-center text-center p-8">
                                            <span className="text-6xl mb-4">🧠</span>
                                            <span className="text-2xl font-bold dark:text-white">7 ± 2</span>
                                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-6 overflow-hidden">
                                                <div className="w-full h-full bg-rose-500 animate-pulse"></div>
                                            </div>
                                            <p className="text-sm text-slate-400 mt-4">Working Memory Capacity</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 비전: 파일을 찾지 마세요. 생각을 항해하세요. */}
            <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-12">
                                파일을 찾지 마세요.<br />
                                <span className="text-cyan-400">생각을 항해하세요.</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-left">
                                    <Compass className="w-12 h-12 text-cyan-400 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">생각의 지도 (Thought Map)</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        언제까지 폴더 트리를 뒤적거리며 시간을 낭비하시겠습니까? 갈피는 당신의 지식 네트워크를 시각화된 '지도'로 펼쳐 보입니다.
                                    </p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-left">
                                    <Network className="w-12 h-12 text-violet-400 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">맥락의 나침반</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        우리는 정보를 저장하는 창고가 아닙니다. 생각의 맥락을 보존하는 나침반입니다.
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-500 italic">
                                (로드맵 포함: 곧, 당신의 생각 지도를 눈으로 확인하게 될 것입니다.)
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA: 도발적인 마무리 */}
            <section className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                                잃어버린 맥락을 찾는 데 <br className="md:hidden" />
                                <span className="text-rose-600 dark:text-rose-400 px-2">하루 20분을 쓰고 계시다면,</span>
                            </h2>
                            <p className="text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-400 mb-12">
                                이제 그 시간을 당신의 '진짜 일'에 투자하세요.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/pricing'}
                                className="group relative px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xl shadow-2xl overflow-hidden shadow-violet-500/10"
                            >
                                <div className="absolute inset-0 bg-violet-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 flex items-center gap-3 font-black">
                                    30ms의 속도 경험하기 (무료 시작)
                                    <Sparkles size={24} className="animate-pulse" />
                                </span>
                            </motion.button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default AboutPage;
