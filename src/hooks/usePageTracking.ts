

import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Hook to track page views automatically on route changes
 */
export const usePageTracking = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const searchParams = useSearchParams();

    useEffect(() => {
        // Track page view on location change
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        trackPageView(url);
    }, [pathname, searchParams]);
};
