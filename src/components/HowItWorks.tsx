import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Hash, Zap, Command, Search, FileText } from 'lucide-react';
import { useTranslation } from '@/locales/i18n';

const Step1Animation = () => (
  <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center overflow-hidden rounded-xl p-4">
    {/* Floating UI Element */}
    <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="space-y-2">
        <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-600 rounded" />
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded" />
        <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-600 rounded" />
      </div>
    </div>

    {/* Key Press Animation */}
    <div className="relative z-10 flex gap-2">
      <motion.div
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        className="w-12 h-12 bg-white dark:bg-slate-700 rounded-lg shadow-md border-b-4 border-slate-300 dark:border-slate-900 flex items-center justify-center"
      >
        <Command size={20} className="text-slate-500 dark:text-slate-300" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        className="w-32 h-12 bg-white dark:bg-slate-700 rounded-lg shadow-md border-b-4 border-slate-300 dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-300"
      >
        SPACE
      </motion.div>
    </div>
  </div>
);

const Step2Animation = () => (
  <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center overflow-hidden rounded-xl p-4">
    {/* Spotlight Bar */}
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 flex items-center gap-2 mb-2">
      <Search size={14} className="text-slate-400" />
      <div className="flex items-center gap-1">
        <span className="text-violet-500 font-bold">#</span>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          className="overflow-hidden whitespace-nowrap text-sm text-slate-800 dark:text-slate-200"
        >
          galpi
        </motion.span>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-0.5 h-4 bg-violet-500"
        />
      </div>
    </div>

    {/* Auto-complete List */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -10] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
      className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
    >
      <div className="p-2 border-b border-slate-100 dark:border-slate-700/50 bg-violet-50 dark:bg-violet-900/20 text-xs text-violet-600 dark:text-violet-300 font-medium">
        # galpi_project
      </div>
      <div className="p-2 text-xs text-slate-500 dark:text-slate-400">
        # galpi_design
      </div>
    </motion.div>
  </div>
);

const Step3Animation = () => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center overflow-hidden rounded-xl p-4">
      {/* Search Input */}
      <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-2 flex items-center gap-2 mb-2">
        <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] text-white font-bold">G</div>
        <span className="text-sm text-slate-800 dark:text-slate-200">{t('howItWorks.steps.2.docName') || '기획서'}</span>
      </div>

      {/* Result Item */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
        className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border-l-4 border-cyan-500 p-3"
      >
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-slate-400" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{t('howItWorks.steps.2.fileName') || '2026_기획서_vFinal.pdf'}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500">PDF</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">/Documents/Work/Galpi/...</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Camera,
      step: "Step 1",
      title: t('howItWorks.steps.0.title'),
      desc: t('howItWorks.steps.0.desc'),
      color: "from-blue-500 to-cyan-500",
      animation: Step1Animation
    },
    {
      icon: Hash,
      step: "Step 2",
      title: t('howItWorks.steps.1.title'),
      desc: t('howItWorks.steps.1.desc'),
      color: "from-violet-500 to-pink-500",
      animation: Step2Animation
    },
    {
      icon: Zap,
      step: "Step 3",
      title: t('howItWorks.steps.2.title'),
      desc: t('howItWorks.steps.2.desc'),
      color: "from-cyan-400 to-emerald-400",
      animation: Step3Animation
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{t('howItWorks.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl transform transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1"></div>
              <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 h-full flex flex-col backdrop-blur-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <step.icon size={28} />
                </div>

                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
                  {step.step}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-8">
                  {step.desc}
                </p>

                {/* Animation Container */}
                <div className="mt-auto bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 h-40 w-full relative overflow-hidden group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors">
                  <step.animation />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;