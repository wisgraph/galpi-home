import React from 'react';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/locales/i18n';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <span className="text-slate-900 dark:text-white shrink-0">{t('navbar.brand')} (galpi)</span>
            </Link>
            <p
              className="text-slate-500 dark:text-slate-400 leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: t('footer.description') }}
            />
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/BeneFYvVmZ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800"
                title="Discord"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://github.com/wisgraph"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:wisgraph.license@gmail.com"
                className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">{t('footer.navTitle')}</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{t('navbar.items.about')}</Link>
              <Link to="/features" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{t('navbar.items.features')}</Link>
              <Link to="/engineering" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{t('navbar.items.engineering')}</Link>
              <Link to="/pricing" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{t('navbar.items.pricing')}</Link>
            </nav>
          </div>

          {/* Business Info Column 1 */}
          <div className="space-y-6 lg:col-span-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">{t('footer.businessTitle')}</h4>
            <div className="space-y-4 text-slate-500 dark:text-slate-500 leading-relaxed font-light">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{t('footer.labels.company')}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">위스그래프 (wisgraph)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{t('footer.labels.businessNumber')}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">483-14-02933</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{t('footer.labels.address')}</p>
                <p className="text-slate-700 dark:text-slate-300 font-medium">경기도 남양주시 화도읍 창현로 19, 503호</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{t('footer.labels.adminSupport')}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">010-4200-1780 <span className="text-slate-400 text-[10px] font-normal italic ml-1">{t('footer.adminOnly')}</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{t('footer.labels.officialSupport')}</p>
                  <div className="flex flex-col gap-0.5">
                    <a href="https://discord.gg/BeneFYvVmZ" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 font-bold hover:text-violet-500 transition-colors">{t('footer.officialSupportValues.discord')}</a>
                    <a href="mailto:wisgraph.license@gmail.com" className="text-slate-700 dark:text-slate-300 font-bold hover:text-rose-600 transition-colors tracking-tight text-xs">{t('footer.officialSupportValues.email')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="text-slate-400 dark:text-slate-500 font-medium">
            {t('footer.copyright')}
          </div>

          <div className="flex items-center gap-8">
            <Link to="/terms" className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">{t('footer.links.terms')}</Link>
            <Link to="/privacy" className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold">{t('footer.links.privacy')}</Link>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600 font-mono italic">
            {t('footer.builtWith')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;