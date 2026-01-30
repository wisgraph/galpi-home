import React, { createContext, useContext, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const theme: Theme = 'dark';
    const isDark = true;

    useEffect(() => {
        const root = document.documentElement;
        root.classList.add('dark');
        root.classList.remove('light');
        localStorage.setItem('hooklink-theme', 'dark');
    }, []);

    const toggleTheme = () => {
        // Disabled per user request to force dark mode
        console.warn('Theme toggle is disabled. Using dark mode only.');
    };

    const value: ThemeContextType = {
        theme,
        toggleTheme,
        isDark,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
