'use client';

import { useEffect, useRef } from 'react';
import { trackEvent, GA_EVENTS } from '../lib/analytics';

/**
 * Hook to track scroll depth (25%, 50%, 75%, 100%)
 */
export const useScrollDepth = () => {
    const trackedDepths = useRef<Set<number>>(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            // Define depths to track
            const depths = [25, 50, 75, 100];

            depths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.current.has(depth)) {
                    trackedDepths.current.add(depth);
                    trackEvent(GA_EVENTS.SCROLL_DEPTH, {
                        percent: depth,
                        page_path: window.location.pathname
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};
