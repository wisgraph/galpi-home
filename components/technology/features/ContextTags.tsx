import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Hash, Settings, MousePointer2, Target, Layers, Layout } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const ContextTags: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-full font-sans selection:bg-indigo-500/30">
            {/* Hero Section */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950 z-0" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Zap size={14} className="animate-pulse" />
                            {t('engineeringPage.featureDetails.contextTags.badge')}
                        </div>
                        <h1
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-6xl px-8 md:px-16 py-32 space-y-40">
                {/* Step 1: Typed Tag */}
                <section className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 text-indigo-500 font-black tracking-widest uppercase text-xs">
                            <Hash size={16} /> {t('engineeringPage.featureDetails.contextTags.steps.typedTag.badge')}
                        </div>
                        <h2
                            className="text-4xl font-black text-slate-900 dark:text-white tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.steps.typedTag.title') }}
                        />
                        <p
                            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.steps.typedTag.description') }}
                        />
                        <div className="flex gap-3">
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono">#project:galpi</span>
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono">#client:internal</span>
                        </div>
                    </div>
                    <div className="lg:col-span-7 relative bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner group">
                        <img
                            src="/assets/images/typed_tag.png"
                            alt="Typed Tag Syntax"
                            className="w-full h-auto object-contain rounded-[1.8rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[1.8rem]" />
                    </div>
                </section>

                {/* Step 2: Context Type */}
                <section className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="order-2 lg:order-1 lg:col-span-7 relative bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner group">
                        <img
                            src="/assets/images/context_type.png"
                            alt="Context Type Settings"
                            className="w-full h-auto object-contain rounded-[1.8rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[1.8rem]" />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2 lg:col-span-5">
                        <div className="inline-flex items-center gap-2 text-indigo-500 font-black tracking-widest uppercase text-xs">
                            <Settings size={16} /> {t('engineeringPage.featureDetails.contextTags.steps.contextType.badge')}
                        </div>
                        <h2
                            className="text-4xl font-black text-slate-900 dark:text-white tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.steps.contextType.title') }}
                        />
                        <p
                            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.steps.contextType.description') }}
                        />
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Layout size={16} />
                            <span>{t('engineeringPage.featureDetails.contextTags.steps.contextType.guide')}</span>
                        </div>
                    </div>
                </section>

                {/* Step 3: Context Stamp */}
                <section className="bg-indigo-600 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-400/20 to-transparent" />

                    <div className="flex flex-col gap-12 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 text-indigo-200 font-black tracking-widest uppercase text-xs">
                                    <Target size={16} /> {t('engineeringPage.featureDetails.contextTags.steps.contextStamp.badge')}
                                </div>
                                <h2
                                    className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                                    dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.steps.contextStamp.title') }}
                                />
                                <p className="text-lg text-indigo-100 leading-relaxed font-light">
                                    {t('engineeringPage.featureDetails.contextTags.steps.contextStamp.description')}
                                </p>
                            </div>
                            <ul className="grid sm:grid-cols-1 gap-6">
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">{t('engineeringPage.featureDetails.contextTags.steps.contextStamp.features.autoInjection.title')}</h4>
                                        <p className="text-indigo-100/70 text-sm">{t('engineeringPage.featureDetails.contextTags.steps.contextStamp.features.autoInjection.description')}</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                                        <MousePointer2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">{t('engineeringPage.featureDetails.contextTags.steps.contextStamp.features.zeroTyping.title')}</h4>
                                        <p className="text-indigo-100/70 text-sm">{t('engineeringPage.featureDetails.contextTags.steps.contextStamp.features.zeroTyping.description')}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative w-full mt-4 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-inner overflow-hidden group">
                            <img
                                src="/assets/images/context_stamp.png"
                                alt="Context Stamp in Search"
                                className="w-full h-auto object-contain rounded-[2.3rem] transition-transform duration-700 group-hover:scale-[1.01]"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.3rem]" />
                        </div>
                    </div>
                </section>

                {/* Recap */}
                <footer className="text-center space-y-8 pt-20 border-t border-slate-100 dark:border-slate-800">
                    <p
                        className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.2]"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.contextTags.footer') }}
                    />
                    <div className="flex justify-center gap-8 text-xs font-mono text-slate-400 tracking-widest uppercase">
                        <span>Rule</span>
                        <span className="text-slate-200 dark:text-slate-800">/</span>
                        <span>Eligibility</span>
                        <span className="text-slate-200 dark:text-slate-800">/</span>
                        <span>State</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ContextTags;

