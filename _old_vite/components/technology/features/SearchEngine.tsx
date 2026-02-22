import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Variable, Cpu, Sparkles, Gauge } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const SearchEngine: React.FC = () => {
    const { t } = useTranslation();
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
                            {t('engineeringPage.featureDetails.searchEngine.badge')}
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.searchEngine.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.searchEngine.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Performance Stats */}
                <section className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">1ms</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">{t('engineeringPage.featureDetails.searchEngine.stats.coldStart')}</div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">0.02s</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">{t('engineeringPage.featureDetails.searchEngine.stats.queryTime')}</div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">5MB</div>
                        <div className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wide">{t('engineeringPage.featureDetails.searchEngine.stats.memory')}</div>
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
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('engineeringPage.featureDetails.searchEngine.features.chosung.title')}</h3>
                            <p
                                className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.searchEngine.features.chosung.description') }}
                            />
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
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('engineeringPage.featureDetails.searchEngine.features.fuzzy.title')}</h3>
                            <p
                                className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.searchEngine.features.fuzzy.description') }}
                            />
                        </div>
                    </div>

                    {/* In-Memory */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('engineeringPage.featureDetails.searchEngine.features.memory.title')}</h2>
                            <p
                                className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.searchEngine.features.memory.description') }}
                            />
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        {t('engineeringPage.featureDetails.searchEngine.footer')}
                    </p>
                </div>

            </main>
        </div>
    );
};

export default SearchEngine;
