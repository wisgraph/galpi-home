import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Cpu, Brain, Repeat, Settings2, Sparkles, MousePointer2, Keyboard } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const AutoContextSearch: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-slate-50 dark:from-purple-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={12} />
                            {t('engineeringPage.featureDetails.autoContextSearch.badge')}
                        </div>
                        <h1
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.autoContextSearch.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.autoContextSearch.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Core Concept */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.autoContextSearch.concept.title')}</h2>
                        <p
                            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.autoContextSearch.concept.description') }}
                        />
                        <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 flex items-start gap-4">
                            <MousePointer2 className="text-rose-500 shrink-0 mt-1 rotate-12" size={24} />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{t('engineeringPage.featureDetails.autoContextSearch.concept.mouseWarning.title')}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {t('engineeringPage.featureDetails.autoContextSearch.concept.mouseWarning.description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800">
                                <Keyboard className="text-purple-500" size={20} />
                                <div className="flex-1">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest">{t('engineeringPage.featureDetails.autoContextSearch.concept.reachBadge')}</div>
                                    <div className="text-xs font-bold text-slate-700 dark:text-white">{t('engineeringPage.featureDetails.autoContextSearch.concept.noMouseBadge')}</div>
                                </div>
                            </div>

                            <div className="flex justify-center py-2 text-purple-500 animate-pulse">
                                <Zap size={20} />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 border-dashed text-center">
                                    <div className="text-[10px] text-purple-400 font-black uppercase mb-1">Tab</div>
                                    <div className="text-[10px] text-slate-500">Navigate</div>
                                </div>
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 border-dashed text-center">
                                    <div className="text-[10px] text-purple-400 font-black uppercase mb-1">Enter</div>
                                    <div className="text-[10px] text-slate-500">Execute</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Automation Integration */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Brain size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.autoContextSearch.smartContext.title')}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('engineeringPage.featureDetails.autoContextSearch.smartContext.recovery.title')}</h3>
                            <p
                                className="text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.autoContextSearch.smartContext.recovery.description') }}
                            />
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 text-indigo-500">
                                <Settings2 size={24} />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.autoContextSearch.smartContext.custom.title')}</h3>
                            </div>
                            <p
                                className="text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.autoContextSearch.smartContext.custom.description') }}
                            />
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p
                        className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.autoContextSearch.footer') }}
                    />
                </div>

            </main>
        </div>
    );
};

export default AutoContextSearch;

