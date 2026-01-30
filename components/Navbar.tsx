import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavbarLogic } from '../hooks/useNavbarLogic';
import { useTranslation } from '@/locales/i18n';

const Navbar: React.FC = () => {
  const { t, locale, setLocale } = useTranslation();
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isVisible,
    location
  } = useNavbarLogic();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const navItems = [
    { label: t('navbar.items.about'), href: '/about' },
    { label: t('navbar.items.features'), href: '/features' },
    { label: t('navbar.items.engineering'), href: '/engineering' },
    { label: t('navbar.items.pricing'), href: '/pricing' },
    { label: t('navbar.items.faq'), href: '/faq' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${isScrolled
        ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-slate-200 dark:border-white/10 py-3 shadow-sm'
        : 'bg-transparent py-5'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer group hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/images/galpi-image.png"
              alt={t('navbar.brand')}
              className="w-8 h-8 object-contain"
            />
            <span className="text-slate-900 dark:text-white">{t('navbar.brand')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-base font-medium transition-colors relative ${isActive(item.href)
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r ${item.href === '/about' ? 'from-rose-500 to-pink-500' :
                      item.href === '/features' ? 'from-cyan-500 to-teal-500' :
                        item.href === '/engineering' ? 'from-blue-600 to-indigo-600' :
                          item.href === '/pricing' ? 'from-amber-500 to-orange-500' :
                            'from-violet-500 to-purple-500'}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-violet-500/50 transition-all text-sm font-bold shadow-sm"
              >
                <Globe size={16} className="text-violet-500" />
                {locale === 'ko' ? '한국어' : 'English'}
                <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-2 overflow-hidden z-[60]"
                  >
                    {[
                      { code: 'ko', label: '🇰🇷 한국어' },
                      { code: 'en', label: '🇺🇸 English' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code as any);
                          setIsLangOpen(false);
                        }}
                        className={`w-full px-5 py-2.5 text-left text-sm transition-colors ${locale === lang.code
                          ? 'bg-violet-500 text-white font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button - High Premium Style */}
            <Link
              to="/pricing"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-violet-500/30 flex items-center gap-2 border-b-2 border-violet-800"
            >
              {t('navbar.actions.download')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
              className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold"
            >
              {locale === 'ko' ? 'EN' : 'KO'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg pt-20 md:hidden"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xl font-medium py-3 border-b border-slate-200 dark:border-slate-800 transition-colors ${isActive(item.href)
                      ? 'text-slate-900 dark:text-white border-violet-500'
                      : 'text-slate-500 dark:text-slate-400'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-6 py-3 rounded-full bg-violet-600 text-white text-center font-semibold"
                >
                  {t('navbar.actions.download')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;