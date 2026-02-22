import ko from './ko.json';
import en from './en.json';
import jp from './jp.json';

const translations: Record<string, any> = {
    ko,
    en,
    jp,
};

export function getTranslation(lang: string, path: string): any {
    const keys = path.split('.');
    let current: any = translations[lang] || translations['en'];

    for (const key of keys) {
        if (!current || current[key] === undefined) {
            // Fallback to KO if key missing in current locale
            if (lang !== 'ko') {
                let fallback: any = translations['ko'];
                for (const fallbackKey of keys) {
                    if (!fallback || fallback[fallbackKey] === undefined) {
                        return path;
                    }
                    fallback = fallback[fallbackKey];
                }
                return fallback;
            }
            return path;
        }
        current = current[key];
    }

    return current;
}
