import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Hook to track page views automatically on route changes
 */
export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page view on location change
        trackPageView(location.pathname + location.search);
    }, [location]);
};
