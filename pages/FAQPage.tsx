import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Minus,
    Zap,
    Shield,
    Database,
    RefreshCw,
    CreditCard,
    MessageCircle,
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useTranslation } from '@/locales/i18n';

const FAQPage: React.FC = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<string | null>('comparison-0');

    const faqCategories = [
        {
            id: 'comparison',
            icon: Zap,
            title: t('faqPage.categories.comparison.title'),
            color: 'text-violet-500',
            faqs: t('faqPage.categories.comparison.faqs')
        },
        {
            id: 'sustainability',
            icon: Shield,
            title: t('faqPage.categories.sustainability.title'),
            color: 'text-indigo-500',
            faqs: t('faqPage.categories.sustainability.faqs')
        },
        {
            id: 'data',
            icon: Database,
            title: t('faqPage.categories.data.title'),
            color: 'text-purple-500',
            faqs: t('faqPage.categories.data.faqs')
        },
        {
            id: 'technical',
            icon: RefreshCw,
            title: t('faqPage.categories.technical.title'),
            color: 'text-violet-600',
            faqs: t('faqPage.categories.technical.faqs')
        },
        {
            id: 'refund',
            icon: CreditCard,
            title: t('faqPage.categories.refund.title'),
            color: 'text-rose-500',
            faqs: t('faqPage.categories.refund.faqs')
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-violet-100 dark:bg-violet-900/10 blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative text-center">
                    <ScrollReveal>
                        <h1
                            className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight"
                            dangerouslySetInnerHTML={{ __html: t('faqPage.hero.title') }}
                        />
                        <p
                            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('faqPage.hero.description') }}
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* Categories */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl space-y-16">
                    {faqCategories.map((category) => (
                        <div key={category.id} className="space-y-8">
                            <div className="flex items-center gap-3 px-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <category.icon className={`w-6 h-6 ${category.color}`} />
                                <h2 className="text-lg font-black text-slate-800 dark:text-slate-200 tracking-tight">{category.title}</h2>
                            </div>

                            <div className="grid gap-6">
                                {category.faqs.map((faq, idx) => {
                                    const id = `${category.id}-${idx}`;
                                    const isOpen = activeIndex === id;
                                    return (
                                        <div
                                            key={id}
                                            className={`transition-all duration-500 rounded-[2.5rem] border ${isOpen
                                                ? 'bg-white dark:bg-slate-900 border-violet-300 dark:border-violet-500/30 shadow-2xl shadow-violet-500/5'
                                                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <button
                                                onClick={() => setActiveIndex(isOpen ? null : id)}
                                                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                                            >
                                                <span className={`text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-violet-600 dark:text-violet-400' : 'text-slate-700 dark:text-slate-300'
                                                    }`}>
                                                    Q. "{faq.question}"
                                                </span>
                                                <div className={`shrink-0 ml-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                                                    ? 'bg-violet-500 border-violet-500 text-white'
                                                    : 'border-slate-200 dark:border-slate-700 text-slate-400'
                                                    }`}>
                                                    {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    >
                                                        <div className="px-8 pb-10 text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-light pt-4 border-t border-slate-50 dark:border-slate-800/50">
                                                            <div className="flex items-start gap-4">
                                                                <span className="text-2xl font-black text-violet-500 dark:text-violet-400 mt-1">A.</span>
                                                                <div
                                                                    className="w-full"
                                                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Outro - Discord Link */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative border-t border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-sm font-black text-violet-500 uppercase tracking-[0.4em] mb-4"> {t('faqPage.outro.badge')} </h2>
                                <h3
                                    className="text-4xl md:text-6xl font-black tracking-tight"
                                    dangerouslySetInnerHTML={{ __html: t('faqPage.outro.title') }}
                                />
                            </div>

                            <p
                                className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto"
                                dangerouslySetInnerHTML={{ __html: t('faqPage.outro.description') }}
                            />

                            <motion.a
                                href="https://discord.gg/BeneFYvVmZ"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-4 px-12 py-6 bg-violet-600 text-white rounded-2xl font-black text-2xl shadow-2xl shadow-violet-600/20 transition-all border-b-4 border-violet-800"
                            >
                                <MessageCircle size={28} />
                                {t('faqPage.outro.button')}
                                <ExternalLink size={20} className="opacity-50" />
                            </motion.a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default FAQPage;
