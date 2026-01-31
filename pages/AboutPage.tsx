import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Brain, Network, Sparkles, Target, Compass } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useTranslation } from '@/locales/i18n';

const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    const engineerParagraphs = t('aboutPage.engineerNote.paragraphs');
    const dictionaryDefinitions = t('aboutPage.dictionary.definitions');
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

                            <h1
                                className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t('aboutPage.hero.title') }}
                            />

                            <p
                                className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: t('aboutPage.hero.description') }}
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 사전적 의미 재정의 */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 text-center">
                                <h2
                                    className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6"
                                    dangerouslySetInnerHTML={{ __html: t('aboutPage.dictionary.title') }}
                                />
                                <div className="space-y-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                                    {Array.isArray(dictionaryDefinitions) && dictionaryDefinitions.map((def: string, idx: number) => (
                                        <p key={idx}>{def}</p>
                                    ))}
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
                            <h2
                                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-12 text-center tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t('aboutPage.engineerNote.title') }}
                            />

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
                                <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
                                    <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200 border-l-4 border-violet-500 pl-4">{t('aboutPage.engineerNote.subtitle')}</h3>

                                    <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        {Array.isArray(engineerParagraphs) && engineerParagraphs.map((p: string, idx: number) => (
                                            <p
                                                key={idx}
                                                className={idx === 1 ? "font-bold text-slate-900 dark:text-white text-xl" : (idx === 3 ? "text-2xl font-black text-slate-900 dark:text-white pt-4" : (idx === 4 ? "border-t border-slate-100 dark:border-slate-800 pt-8 mt-8" : ""))}
                                                dangerouslySetInnerHTML={{ __html: p }}
                                            />
                                        ))}
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
                            <h2
                                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-16 text-center"
                                dangerouslySetInnerHTML={{ __html: t('aboutPage.philosophy.title') }}
                            />

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                                        <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-4">{t('aboutPage.philosophy.law.title')}</h3>
                                        <p
                                            className="text-slate-600 dark:text-slate-400 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: t('aboutPage.philosophy.law.description') }}
                                        />
                                    </div>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {t('aboutPage.philosophy.description')}
                                    </p>
                                    <p
                                        className="text-xl font-bold text-slate-900 dark:text-white"
                                        dangerouslySetInnerHTML={{ __html: t('aboutPage.philosophy.synapse') }}
                                    />
                                </div>
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl aspect-square flex items-center justify-center p-1 shadow-2xl shadow-rose-500/20">
                                        <div className="bg-white dark:bg-slate-900 w-full h-full rounded-[20px] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">

                                            {/* 7 vs Infinity Animation */}
                                            <div className="flex items-center gap-8 z-10">
                                                <div className="text-center opacity-40 grayscale">
                                                    <span className="text-4xl block mb-2">🧠</span>
                                                    <span className="text-xl font-bold text-slate-400">Limit: 7</span>
                                                </div>
                                                <div className="w-px h-16 bg-slate-200 dark:bg-slate-800"></div>
                                                <div className="text-center scale-110">
                                                    <span className="text-4xl block mb-2">♾️</span>
                                                    <span className="text-xl font-black bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">Galpi: ∞</span>
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-pink-500/5 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 비전: 파일을 찾지 마세요. 생각을 항해하세요. */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-20"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2
                                className="text-3xl md:text-5xl font-bold mb-12 text-center"
                                dangerouslySetInnerHTML={{ __html: t('aboutPage.vision.title') }}
                            />

                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                <div className="bg-white dark:bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-left shadow-xl dark:shadow-none">
                                    <Compass className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">{t('aboutPage.vision.thoughtMap.title')}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {t('aboutPage.vision.thoughtMap.description')}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-left shadow-xl dark:shadow-none">
                                    <Network className="w-12 h-12 text-violet-600 dark:text-violet-400 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">{t('aboutPage.vision.compass.title')}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {t('aboutPage.vision.compass.description')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-4 mt-16">
                                <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest animate-pulse">
                                    {t('aboutPage.vision.comingSoon')}
                                </span>
                                <p className="text-slate-500 italic max-w-xl">
                                    {t('aboutPage.vision.comingSoonQuote')}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA: 도발적인 마무리 */}
            <section className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2
                                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight"
                                dangerouslySetInnerHTML={{ __html: t('aboutPage.cta.title') }}
                            />
                            <p className="text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-400 mb-12">
                                {t('aboutPage.cta.subtitle')}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/pricing'}
                                className="group relative px-12 py-6 bg-violet-600 dark:bg-violet-500 text-white rounded-2xl font-black text-xl shadow-2xl overflow-hidden shadow-violet-500/20 border-b-4 border-violet-800 dark:border-violet-700"
                            >
                                <div className="absolute inset-0 bg-violet-700 dark:bg-violet-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 flex items-center gap-3 font-black">
                                    {t('aboutPage.cta.button')}
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
