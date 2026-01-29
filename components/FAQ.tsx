import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-6 relative z-10">
      {/* Subtle Orange Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-orange-600/5 blur-[120px] pointer-events-none -z-10" />

      {FAQS.map((faq, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div
            key={idx}
            className={`transition-all duration-500 rounded-3xl border ${isOpen
              ? 'bg-white dark:bg-slate-900 border-orange-500/30 shadow-2xl shadow-orange-500/5'
              : 'bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
              }`}
          >
            <button
              onClick={() => setActiveIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-7 text-left focus:outline-none group"
            >
              <span className={`text-lg font-bold tracking-tight transition-colors ${isOpen
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-slate-700 dark:text-slate-300'
                }`}>
                {faq.question}
              </span>
              <div className={`shrink-0 ml-4 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                ? 'bg-orange-600 border-orange-600 text-white'
                : 'border-slate-200 dark:border-white/10 text-slate-400 group-hover:border-slate-300 dark:group-hover:border-white/20'
                }`}>
                {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-7 pb-10 text-slate-600 dark:text-slate-400 leading-relaxed text-base font-light">
                    <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;