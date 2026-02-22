import React from 'react';
import { motion } from 'framer-motion';
import { Link2Off, Compass, Anchor, ShieldCheck, Target, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const UnbrokenLinks: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-full font-sans selection:bg-emerald-500/30">
            {/* Header */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Anchor size={14} />
                            {t('engineeringPage.featureDetails.unbrokenLinks.badge')}
                        </div>
                        <h1
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.unbrokenLinks.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.unbrokenLinks.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-5xl px-8 md:px-16 py-32 space-y-32">
                {/* Section 1: The Nightmare */}
                <section className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                            <Link2Off size={32} />
                        </div>
                        <h2
                            className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.unbrokenLinks.nightmare.title') }}
                        />
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            {t('engineeringPage.featureDetails.unbrokenLinks.nightmare.description')}
                        </p>
                        <div className="p-6 bg-red-50 dark:bg-red-950/10 rounded-2xl border border-red-100 dark:border-red-900/20 italic text-slate-500 dark:text-slate-400 font-light text-sm">
                            {t('engineeringPage.featureDetails.unbrokenLinks.nightmare.quote')}
                        </div>
                    </div>

                    <div className="relative p-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6">
                            <div className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase rounded-full animate-bounce shadow-lg shadow-red-500/20">
                                {t('engineeringPage.featureDetails.unbrokenLinks.nightmare.badge')}
                            </div>
                        </div>
                        <div className="space-y-8 pt-8">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('engineeringPage.featureDetails.unbrokenLinks.nightmare.yesterday')}</p>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 font-mono text-xs text-slate-500">
                                    /Users/me/Documents/Draft/v1_Final.pdf
                                </div>
                            </div>
                            <div className="flex justify-center text-red-500 opacity-50"><Link2Off size={32} /></div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('engineeringPage.featureDetails.unbrokenLinks.nightmare.today')}</p>
                                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-100 dark:border-red-900/30 font-mono text-xs text-red-500 shadow-inner">
                                    /Users/me/Projects/Archive/v1_Real_Final.pdf
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Stalker Logic */}
                <section className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden group shadow-xl dark:shadow-3xl border border-slate-200 dark:border-white/5">
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />

                    <div className="max-w-3xl space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm tracking-widest uppercase">
                            <Target size={18} className="animate-spin-slow" />
                            {t('engineeringPage.featureDetails.unbrokenLinks.stalker.badge')}
                        </div>
                        <h2
                            className="text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.unbrokenLinks.stalker.title') }}
                        />
                        <p
                            className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.unbrokenLinks.stalker.description') }}
                        />

                        <div className="grid md:grid-cols-2 gap-10 pt-10 text-left">
                            <div className="space-y-4 p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                                <h4 className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-3 uppercase tracking-tight">
                                    <ShieldCheck size={20} /> {t('engineeringPage.featureDetails.unbrokenLinks.stalker.inode.title')}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                    {t('engineeringPage.featureDetails.unbrokenLinks.stalker.inode.description')}
                                </p>
                            </div>
                            <div className="space-y-4 p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                                <h4 className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-3 uppercase tracking-tight">
                                    <ExternalLink size={20} /> {t('engineeringPage.featureDetails.unbrokenLinks.stalker.alias.title')}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                    {t('engineeringPage.featureDetails.unbrokenLinks.stalker.alias.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-20 border-t border-slate-100 dark:border-slate-800 lg:px-20">
                    <p
                        className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white mb-8 leading-tight"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.unbrokenLinks.footer') }}
                    />
                    <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                        <span className="w-12 h-px bg-slate-300 dark:bg-slate-800" />
                        {t('engineeringPage.featureDetails.unbrokenLinks.manifesto')}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UnbrokenLinks;
