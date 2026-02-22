import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, GitBranch, ArrowRight, Anchor, Layers } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const KnowledgeWorkflow: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-teal-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-slate-50 dark:from-teal-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <BrainCircuit size={12} />
                            {t('engineeringPage.featureDetails.knowledgeWorkflow.badge')}
                        </div>
                        <h1
                            className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.description') }}
                        />
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p
                        className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.intro') }}
                    />
                </section>

                {/* Section 1: Context Fixing */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                            <Anchor size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('engineeringPage.featureDetails.knowledgeWorkflow.contextFixing.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {t('engineeringPage.featureDetails.knowledgeWorkflow.contextFixing.description')}
                        </p>
                        <ul className="space-y-3">
                            {(() => {
                                const steps = t('engineeringPage.featureDetails.knowledgeWorkflow.contextFixing.steps', { returnObjects: true });
                                if (!Array.isArray(steps)) return null;
                                return steps.map((step: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${i === 2 ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                            {i === 2 ? '✓' : String.fromCharCode(65 + i)}
                                        </span>
                                        <span className={i === 2 ? 'font-bold text-teal-600 dark:text-teal-400' : ''}>{step}</span>
                                    </li>
                                ));
                            })()}
                        </ul>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 relative min-h-[300px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                        {/* Abstract Visual */}
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-bold shadow-lg shadow-teal-500/30">
                                Context: #Project_A
                            </div>
                            <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-700" />
                            <div className="flex gap-2">
                                <div className="p-3 bg-white dark:bg-black rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">file_1.pdf</div>
                                <div className="p-3 bg-white dark:bg-black rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse delay-75">link_2.url</div>
                                <div className="p-3 bg-white dark:bg-black rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse delay-150">note_3.md</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Digital Desk */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Layers size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.knowledgeWorkflow.digitalDesk.title')}</h2>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl dark:shadow-3xl border border-slate-200 dark:border-white/5">
                        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/50 to-transparent" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{t('engineeringPage.featureDetails.knowledgeWorkflow.digitalDesk.instantSwitching.title')}</h3>
                                <p
                                    className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8"
                                    dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.digitalDesk.instantSwitching.description') }}
                                />
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center font-bold">A</div>
                                    <div className="flex-1">
                                        <div className="text-slate-500 dark:text-slate-400 text-xs">{t('engineeringPage.featureDetails.knowledgeWorkflow.digitalDesk.previousContext')}</div>
                                        <div className="font-bold text-slate-900 dark:text-white">Project Alpha</div>
                                    </div>
                                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                                </div>
                                <div className="flex justify-center text-slate-500"><ArrowRight className="rotate-90 md:rotate-0" /></div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-600 border border-indigo-400 shadow-xl shadow-indigo-500/20 cursor-pointer">
                                    <div className="w-8 h-8 rounded bg-white text-indigo-600 flex items-center justify-center font-bold">B</div>
                                    <div className="flex-1">
                                        <div className="text-indigo-100 dark:text-indigo-200 text-xs">{t('engineeringPage.featureDetails.knowledgeWorkflow.digitalDesk.activeContext')}</div>
                                        <div className="font-bold text-white">Project Beta</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Bidirectional Loop */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">{t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.title')}</h2>

                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-indigo-200 to-teal-200 dark:from-teal-900 dark:via-indigo-900 dark:to-teal-900 -z-10" />

                        <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-4 font-black">1</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.capture.title')}</h3>
                            <p
                                className="text-sm text-slate-500"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.capture.description') }}
                            />
                        </div>
                        <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-4 font-black">2</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.organize.title')}</h3>
                            <p
                                className="text-sm text-slate-500"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.organize.description') }}
                            />
                        </div>
                        <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-4 font-black">3</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.jump.title')}</h3>
                            <p
                                className="text-sm text-slate-500"
                                dangerouslySetInnerHTML={{ __html: t('engineeringPage.featureDetails.knowledgeWorkflow.perfectLoop.jump.description') }}
                            />
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        {t('engineeringPage.featureDetails.knowledgeWorkflow.footer')}
                    </p>
                </div>

            </main>
        </div>
    );
};

export default KnowledgeWorkflow;
