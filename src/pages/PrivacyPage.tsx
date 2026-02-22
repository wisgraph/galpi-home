import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, Database } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useTranslation } from '@/locales/i18n';

const PrivacyPage: React.FC = () => {
    const { t } = useTranslation();

    const notCollectedItems = t('privacyPage.notCollected.items', { returnObjects: true }) as string[];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-violet-100 dark:bg-violet-900/10 blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-violet-600 rounded-2xl text-white">
                                <ShieldCheck size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t('privacyPage.title')}</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-12 font-light">{t('privacyPage.lastUpdated')}</p>

                        <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            {/* 핵심 원칙 */}
                            <div className="p-8 bg-violet-600 text-white rounded-[2.5rem] shadow-2xl shadow-violet-600/20">
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                                    <EyeOff size={24} /> {t('privacyPage.summary.title')}
                                </h2>
                                <p className="text-violet-100 leading-relaxed">
                                    {t('privacyPage.summary.description')}
                                </p>
                            </div>

                            {/* 상세 내용 */}
                            <section className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4 p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                                        <Lock size={24} className="text-violet-500" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('privacyPage.notCollected.title')}</h3>
                                        <ul className="text-sm space-y-2 opacity-80">
                                            {notCollectedItems.map((item, i) => (
                                                <li key={i}>- {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4 p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                                        <Database size={24} className="text-violet-500" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('privacyPage.storage.title')}</h3>
                                        <p
                                            className="text-sm"
                                            dangerouslySetInnerHTML={{ __html: t('privacyPage.storage.description') }}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('privacyPage.payment.title')}</h2>
                                <p>
                                    {t('privacyPage.payment.description')}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('privacyPage.destruction.title')}</h2>
                                <p>
                                    {t('privacyPage.destruction.description')}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('privacyPage.contact.title')}</h2>
                                <p>
                                    {t('privacyPage.contact.description')}<br />
                                    {t('privacyPage.contact.email')}
                                </p>
                            </section>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default PrivacyPage;

