import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import { useTranslation } from '@/locales/i18n';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const tiersData = t('pricing.tiers');
  const tiers = Array.isArray(tiersData) ? tiersData : [];

  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      {/* Absolute Glow Background - Restored to Amber/Orange */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-orange-400/10 dark:bg-orange-900/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
              dangerouslySetInnerHTML={{ __html: t('pricing.title') }}
            />
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light">
              {t('pricing.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {tiers.map((plan: any, index: number) => (
            <ScrollReveal key={plan.name || index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className={`relative rounded-[2.5rem] p-10 h-full transition-all border-2 ${plan.name === 'Pro Lifetime'
                  ? 'bg-white dark:bg-slate-900 border-amber-400 shadow-[0_20px_60px_rgba(249,115,22,0.15)]'
                  : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 right-10 bg-gradient-to-r from-orange-600 to-red-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-10 text-left">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    {plan.originalPrice && <span className="text-slate-400 line-through text-2xl font-light">{plan.originalPrice}</span>}
                    <span className={`text-7xl font-black tracking-tighter italic ${plan.name === 'Pro Lifetime' ? 'text-orange-600' : 'text-slate-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium italic">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-12 flex-grow">
                  {Array.isArray(plan.features) && plan.features.map((feature: string, fIdx: number) => {
                    // Check for highlights or standard features
                    const isHighlightedFeature = plan.name === 'Pro Lifetime' && (fIdx === 0);
                    return (
                      <li key={fIdx} className="flex items-start gap-4 text-slate-600 dark:text-slate-400">
                        <Check size={18} className={isHighlightedFeature ? 'text-amber-500' : 'text-emerald-500'} strokeWidth={3} />
                        <span className={`text-base leading-tight ${isHighlightedFeature ? 'text-slate-900 dark:text-white font-bold' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <motion.a
                  href={plan.name === 'Pro Lifetime' ? '#purchase' : 'https://github.com/wisgraph/galpi-release'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all ${plan.name === 'Pro Lifetime'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl shadow-orange-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200'
                    }`}
                >
                  {plan.cta}
                  <ArrowRight size={20} />
                </motion.a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;