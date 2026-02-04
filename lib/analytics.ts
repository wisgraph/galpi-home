/**
 * Google Analytics 4 tracking utility
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

// Type for GA event parameters
export interface EventParams {
    [key: string]: string | number | boolean;
}

/**
 * Send a custom event to GA4
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    } else {
        console.warn(`[GA] gtag not found. Event ${eventName} was not sent.`, params);
    }
};

/**
 * Send a page_view event to GA4
 */
export const trackPageView = (url: string, title?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
            page_title: title || document.title,
        });
    }
};

/**
 * Predefined event names and categories for consistency
 */
export const GA_EVENTS = {
    CTA_CLICK: 'cta_click',
    SCROLL_DEPTH: 'scroll_depth',
    NAV_CLICK: 'nav_click',
};
