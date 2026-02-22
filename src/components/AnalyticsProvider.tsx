'use client';

import React, { ReactNode } from 'react';
import { usePageTracking } from '../hooks/usePageTracking';
import { useScrollDepth } from '../hooks/useScrollDepth';

interface AnalyticsProviderProps {
    children: ReactNode;
}

/**
 * Provider component that initializes all tracking hooks
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
    // Initialize hooks
    usePageTracking();
    useScrollDepth();

    return <>{children}</>;
};

export default AnalyticsProvider;
