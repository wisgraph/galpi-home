import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Command, Keyboard, Zap, Hash, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const TagAutocomplete: React.FC = () => {
    const { t } = useTranslation();

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
                            {t('engineeringPage.featureDetails.tagAutocomplete.badge')}
                        </div>
                        <h1
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.tagAutocomplete.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.tagAutocomplete.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p
                        className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.tagAutocomplete.intro') }}
                    />
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
                                        {t('engineeringPage.featureDetails.tagAutocomplete.mockup.badge')}
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
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('engineeringPage.featureDetails.tagAutocomplete.features.learning.title')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {t('engineeringPage.featureDetails.tagAutocomplete.features.learning.description')}
                        </p>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-black shadow-sm flex items-center justify-center text-slate-900 dark:text-white mb-6">
                            <Keyboard size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('engineeringPage.featureDetails.tagAutocomplete.features.frictionless.title')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {t('engineeringPage.featureDetails.tagAutocomplete.features.frictionless.description')}
                        </p>
                    </div>
                </section>

                {/* Pro Tip */}
                <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                            <Command size={12} />
                            {t('engineeringPage.featureDetails.tagAutocomplete.proTip.badge')}
                        </div>
                        <h2 className="text-3xl font-black mb-6">{t('engineeringPage.featureDetails.tagAutocomplete.proTip.title')}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p
                                    className="text-indigo-100 leading-relaxed mb-6 font-medium"
                                    dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.tagAutocomplete.proTip.description') }}
                                />
                                <div className="flex items-center gap-4 text-sm font-mono text-indigo-200">
                                    <span className="px-2 py-1 bg-black/20 rounded">#tag</span>
                                    <ArrowRight size={16} />
                                    <span className="px-2 py-1 bg-white/20 rounded text-white font-bold">{t('engineeringPage.featureDetails.tagAutocomplete.proTip.action')}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="p-6 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <p className="mb-2 text-indigo-100 text-sm">{t('engineeringPage.featureDetails.tagAutocomplete.proTip.action')}</p>
                                    <div className="text-2xl font-black">Cmd + Enter</div>
                                    <p className="mt-2 text-xs text-indigo-200">{t('engineeringPage.featureDetails.tagAutocomplete.proTip.actionDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        {t('engineeringPage.featureDetails.tagAutocomplete.footer')}
                    </p>
                </div>

            </main>
        </div>
    );
};

export default TagAutocomplete;

