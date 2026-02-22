import React from 'react';
import { useTranslation } from '@/locales/i18n';

const ComparisonTable: React.FC = () => {
  const { t } = useTranslation();
  const comparisonItems = t('comparison.items');
  const rows = Array.isArray(comparisonItems) ? comparisonItems : [];

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">{t('comparison.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {t('comparison.subtitle')}
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full max-w-5xl mx-auto border-collapse text-left relative z-10">
            <thead>
              <tr>
                <th className="p-6 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">{t('comparison.headers.feature')}</th>
                <th className="p-6 border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-medium w-1/3 text-sm uppercase tracking-wider">{t('comparison.headers.competitor')}</th>
                <th className="relative p-6 w-1/3 border-b border-violet-300 dark:border-indigo-500/30">
                  <span className="relative z-10 text-violet-600 dark:text-indigo-400 font-bold text-lg">{t('comparison.headers.galpi')}</span>
                </th>
                <th className="p-6 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium hidden md:table-cell text-sm uppercase tracking-wider">{t('comparison.headers.why')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, idx: number) => (
                <tr key={idx} className="group hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 font-semibold text-slate-700 dark:text-slate-300">{row.feature}</td>
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 text-slate-500">{row.competitor}</td>
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 bg-violet-50 dark:bg-indigo-900/5 border-x border-violet-100 dark:border-slate-800/30 text-slate-900 dark:text-white font-medium md:border-x-0">
                    {row.galpi}
                  </td>
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 text-slate-500 text-sm italic hidden md:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{t('comparison.footer.title') || t('comparison.title')}</h3>
          <a href="#pricing" className="inline-block px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-violet-500/25">
            {t('comparison.cta')}
          </a>
          <p className="mt-6 text-sm text-slate-500">{t('comparison.footerNote')}</p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;