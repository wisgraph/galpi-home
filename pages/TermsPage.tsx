import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useTranslation } from '@/locales/i18n';

const TermsPage: React.FC = () => {
    const { t } = useTranslation();

    const sections = t('termsPage.sections', { returnObjects: true }) as any[];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-slate-100 dark:bg-slate-900/20 blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-slate-900 dark:bg-white rounded-2xl text-white dark:text-slate-900">
                                <Scale size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t('termsPage.title')}</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-12 font-light">{t('termsPage.lastUpdated')}</p>

                        <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            {sections.map((section, idx) => (
                                <section key={section.id} className="space-y-4">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="text-slate-400">{section.id}.</span> {section.title}
                                    </h2>
                                    {section.id === '03' ? (
                                        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                                            {section.items.map((item: string, i: number) => (
                                                <p key={i}>{item}</p>
                                            ))}
                                        </div>
                                    ) : section.id === '05' ? (
                                        <div className="flex gap-4 p-6 bg-rose-50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/20 rounded-3xl text-rose-900 dark:text-rose-200">
                                            <AlertCircle className="shrink-0" />
                                            <p className="text-sm">
                                                {section.content}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>{section.content}</p>
                                    )}
                                </section>
                            ))}

                            {/* Footer */}
                            <div className="pt-16 border-t border-slate-100 dark:border-slate-800 text-center">
                                <p className="text-slate-400 text-sm">{t('termsPage.footer')}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default TermsPage;

