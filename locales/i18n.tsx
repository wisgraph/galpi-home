import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ko from './ko.json';
import en from './en.json';

const translations: Record<string, any> = {
    ko,
    en,
};

type Locale = 'ko' | 'en';

interface TranslationContextType {
    t: (path: string, options?: any) => any;
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('galpi-locale') as Locale;
            if (saved && (saved === 'ko' || saved === 'en')) return saved;

            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'ko') return 'ko';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('galpi-locale', locale);
        document.documentElement.lang = locale;
    }, [locale]);

    const t = (path: string, _options?: any): any => {
        const keys = path.split('.');
        let current: any = translations[locale];

        for (const key of keys) {
            if (!current || current[key] === undefined) {
                // Fallback to KO if key missing in current locale
                if (locale !== 'ko') {
                    let fallback: any = translations['ko'];
                    for (const fallbackKey of keys) {
                        if (!fallback || fallback[fallbackKey] === undefined) {
                            console.warn(`Translation missing: ${path}`);
                            return path;
                        }
                        fallback = fallback[fallbackKey];
                    }
                    return fallback;
                }
                console.warn(`Translation missing: ${path}`);
                return path;
            }
            current = current[key];
        }

        return current;
    };

    return (
        <TranslationContext.Provider value={{ t, locale, setLocale }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
