import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Database,
    Shield,
    Zap,
    GitBranch,
    FileJson,
    Fingerprint,
    Code2,
    ArrowRight,
    CheckCircle2,
    XCircle,
    HardDrive
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import DocSidebar from '../components/technology/DocSidebar';
import { FeatureRegistry, FeatureList } from '../components/technology/TechRegistry';
import { useTranslation } from '@/locales/i18n';

/**
 * TechOverview: This is the updated "Chapter-based" or "Manifesto" overview
 * that replaces the old basic overview while maintaining the engineering truths.
 */
const TechOverview: React.FC = () => {
    const { t } = useTranslation();
    const rustFeatures = t('engineeringPage.overview.rust.features');
    const dataList = t('engineeringPage.overview.data.list');
    return (
        <div className="bg-white dark:bg-slate-950">
            {/* 1. Rust Native Performance */}
            <section className="py-20 md:py-32 border-b border-slate-100 dark:border-slate-800 px-6 md:px-12">
                <div className="max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 text-cyan-500 font-black tracking-widest uppercase text-sm">
                                <Cpu size={20} /> {t('engineeringPage.overview.rust.badge')}
                            </div>
                            <h2
                                className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.overview.rust.title') }}
                            />
                            <p
                                className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.overview.rust.description') }}
                            />
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>{t('engineeringPage.overview.rust.chart.galpiLabel')}</span>
                                        <span className="text-cyan-500">{t('engineeringPage.overview.rust.chart.galpiValue')}</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '8%' }}
                                            transition={{ duration: 1 }}
                                            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                        <span>{t('engineeringPage.overview.rust.chart.otherLabel')}</span>
                                        <span>{t('engineeringPage.overview.rust.chart.otherValue')}</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {Array.isArray(rustFeatures) && rustFeatures.map((item: any, i: number) => {
                                const icons = [Zap, HardDrive, GitBranch];
                                const Icon = icons[i] || Zap;
                                return (
                                    <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-black dark:text-white mb-2 uppercase">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Data Sovereignty (JSONL) */}
            <section className="py-20 md:py-32 px-6 md:px-12">
                <div className="max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 bg-slate-900 rounded-[3rem] p-10 border border-white/10 shadow-3xl font-mono text-xs overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 relative z-10">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">data.jsonl</span>
                            </div>
                            <div className="space-y-4 text-emerald-400 relative z-10">
                                <p className="opacity-40 italic">{"// Transparent text, not encrypted binary"}</p>
                                <div className="space-y-1">
                                    <p><span className="text-purple-400">{"{"}</span></p>
                                    <p className="pl-6">"title": <span className="text-amber-300">"Manifesto.md"</span>,</p>
                                    <p className="pl-6">"tags": [<span className="text-amber-300">"#engineering"</span>],</p>
                                    <p className="pl-6">"inode": <span className="text-blue-400">987654321</span></p>
                                    <p><span className="text-purple-400">{"}"}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-10">
                            <div className="inline-flex items-center gap-3 text-emerald-500 font-black tracking-widest uppercase text-sm">
                                <Shield size={20} /> {t('engineeringPage.overview.data.badge')}
                            </div>
                            <h2
                                className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.overview.data.title') }}
                            />
                            <p
                                className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.overview.data.description') }}
                            />
                            <div className="flex flex-col gap-4">
                                {Array.isArray(dataList) && dataList.map((li: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-bold uppercase text-xs tracking-widest">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span>{li}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const EngineeringPage: React.FC = () => {
    const { t } = useTranslation();
    const [selectedId, setSelectedId] = useState<string>('overview');

    const SelectedComponent = selectedId === 'overview' ? TechOverview : FeatureRegistry[selectedId];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen flex flex-col"
        >
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-900/10 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative text-center">
                    <ScrollReveal>

                        <h1
                            className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.hero.title') }}
                        />

                        <p
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.hero.description') }}
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* Split View Documentation */}
            <div className="flex-1 flex flex-col md:flex-row border-t border-slate-100 dark:border-slate-800 relative z-10">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row">
                    {/* Sidebar Area with persistent divider */}
                    <DocSidebar
                        docs={[
                            { id: 'overview', title: t('engineeringPage.sidebar.overview'), highlight: false, separator: true },
                            ...FeatureList.map(item => ({
                                ...item,
                                title: t(`engineeringPage.features.${item.id}`)
                            }))
                        ]}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0 bg-white dark:bg-slate-950 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="h-full"
                            >
                                {SelectedComponent ? (
                                    <SelectedComponent />
                                ) : (
                                    <div className="py-24 text-center text-slate-500 font-black uppercase tracking-widest">
                                        {t('engineeringPage.status.underConstruction')}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Global CTA */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent" />
                <div className="container mx-auto px-6 relative z-10">
                    <h2
                        className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tight"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.cta.title') }}
                    />
                    <motion.a
                        href="/features"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-400 transition-all border-b-4 border-blue-800 dark:border-blue-600 shadow-blue-500/20"
                    >
                        {t('engineeringPage.cta.button')}
                        <ArrowRight size={20} />
                    </motion.a>
                </div>
            </section>
        </motion.div>
    );
};

export default EngineeringPage;
