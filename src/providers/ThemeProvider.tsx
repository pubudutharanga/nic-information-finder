'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, lightTheme, darkTheme, ThemeColors } from '@/lib/theme';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    colors: ThemeColors;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'nic-theme-preference';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(THEME_KEY) as Theme | null;
        if (stored && ['light', 'dark', 'system'].includes(stored)) {
            setThemeState(stored);
        }
    }, []);

    // Resolve system theme and apply
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateResolvedTheme = () => {
            const resolved = theme === 'system'
                ? (mediaQuery.matches ? 'dark' : 'light')
                : theme;

            setResolvedTheme(resolved);

            // Apply to document
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(resolved);
            document.documentElement.style.colorScheme = resolved;
        };

        updateResolvedTheme();

        // Listen for system theme changes
        mediaQuery.addEventListener('change', updateResolvedTheme);
        return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    };

    const colors = resolvedTheme === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, colors, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
