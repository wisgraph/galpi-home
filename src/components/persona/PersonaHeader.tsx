import React from "react";
import { useTranslation } from '@/locales/i18n';

const PersonaHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950" />
      <div className="relative z-10 text-center px-6">
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8"
          dangerouslySetInnerHTML={{ __html: t('persona.header.title') }}
        />
        <div className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed space-y-4">
          <p dangerouslySetInnerHTML={{ __html: t('persona.header.description1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('persona.header.description2') }} />
        </div>
      </div>
    </div>
  );
};

export default PersonaHeader;
