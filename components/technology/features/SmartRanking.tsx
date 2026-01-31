import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Layers, Sparkles, Brain, ArrowDown } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const SmartRanking: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-full font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950 z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Sparkles size={14} className="animate-spin-slow" />
                            {t('engineeringPage.featureDetails.smartRanking.badge')}
                        </div>
                        <h1
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.smartRanking.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.smartRanking.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-5xl px-8 md:px-16 py-32 space-y-32">
                {/* Section 1: The Gravity Algorithm */}
                <section className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h2
                                className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.smartRanking.gravity.title') }}
                            />
                            <p
                                className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.smartRanking.gravity.description') }}
                            />
                        </div>

                        <div className="space-y-6">
                            {(() => {
                                const features = t('engineeringPage.featureDetails.smartRanking.gravity.features', { returnObjects: true });
                                if (!Array.isArray(features)) return null;
                                return features.map((item: any, i: number) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 font-black text-xs">
                                            0{i + 1}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-black text-slate-900 dark:text-white">{item.label}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    <div className="relative p-12 bg-white dark:bg-slate-900 rounded-[4rem] text-slate-900 dark:text-white overflow-hidden shadow-2xl group border border-slate-200 dark:border-white/5">
                        <div className="absolute top-0 right-10 flex gap-4 opacity-20">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, 100, 0] }}
                                    transition={{ duration: 5, delay: i * 1.5, repeat: Infinity }}
                                    className="w-px h-64 bg-indigo-500"
                                />
                            ))}
                        </div>

                        <div className="relative z-10 space-y-12">
                            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400">{t('engineeringPage.featureDetails.smartRanking.gravity.visual.badge')}</h3>
                            <div className="space-y-6">
                                <div className="p-6 bg-indigo-500 rounded-3xl shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-indigo-400">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black uppercase">{t('engineeringPage.featureDetails.smartRanking.gravity.visual.item1.badge')}</span>
                                        <ArrowDown size={14} />
                                    </div>
                                    <p className="font-bold text-lg mb-2">{t('engineeringPage.featureDetails.smartRanking.gravity.visual.item1.title')}</p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-white/20 rounded-md text-[8px] font-black uppercase">Mass: 98.4</span>
                                        <span className="px-2 py-1 bg-white/20 rounded-md text-[8px] font-black uppercase">{t('engineeringPage.featureDetails.smartRanking.gravity.visual.item1.tag')}</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10 opacity-60">
                                    <p className="font-bold mb-2 text-slate-700 dark:text-white/80">{t('engineeringPage.featureDetails.smartRanking.gravity.visual.item2.title')}</p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-slate-200 dark:bg-white/10 rounded-md text-[8px] font-black uppercase text-slate-500 dark:text-white/60">Decayed: 12.1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Zero Labor Indexing */}
                <section className="bg-indigo-600 dark:bg-indigo-600 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden group shadow-[0_50px_100px_rgba(79,70,229,0.3)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 to-transparent opacity-50" />

                    <div className="relative z-10 grid md:grid-cols-5 gap-12 items-center">
                        <div className="md:col-span-3 space-y-8">
                            <h2
                                className="text-3xl md:text-5xl font-black leading-tight tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.smartRanking.zeroLabor.title') }}
                            />
                            <p className="text-xl text-indigo-100 leading-relaxed font-light">
                                {t('engineeringPage.featureDetails.smartRanking.zeroLabor.description')}
                            </p>
                            <div className="flex gap-6">
                                <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex-1">
                                    <span className="text-[10px] font-black uppercase text-indigo-200 block mb-2">{t('engineeringPage.featureDetails.smartRanking.zeroLabor.stats.success.label')}</span>
                                    <span className="text-3xl font-black">{t('engineeringPage.featureDetails.smartRanking.zeroLabor.stats.success.value')}</span>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex-1">
                                    <span className="text-[10px] font-black uppercase text-indigo-200 block mb-2">{t('engineeringPage.featureDetails.smartRanking.zeroLabor.stats.time.label')}</span>
                                    <span className="text-3xl font-black">{t('engineeringPage.featureDetails.smartRanking.zeroLabor.stats.time.value')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-center">
                            <Brain size={160} className="text-white opacity-20" />
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-20 border-t border-slate-100 dark:border-slate-800 lg:px-20">
                    <p
                        className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white mb-8 leading-tight"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.smartRanking.footer') }}
                    />
                    <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                        <span className="w-12 h-px bg-slate-300 dark:bg-slate-800" />
                        {t('engineeringPage.featureDetails.smartRanking.manifesto')}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SmartRanking;

