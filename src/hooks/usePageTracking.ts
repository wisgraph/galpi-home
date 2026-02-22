'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '../lib/analytics';

/**
 * Hook to track page views automatically on route changes
 */
export const usePageTracking = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Track page view on location change
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        trackPageView(url);
    }, [pathname, searchParams]);
};
