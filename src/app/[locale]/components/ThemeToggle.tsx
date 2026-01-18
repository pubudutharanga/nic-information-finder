'use client';

import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import type { Theme } from '@/lib/theme';

/**
 * Theme Toggle Component
 * 
 * A toggle button for switching between light, dark, and system themes.
 * Uses icons to indicate current state with smooth animations.
 */
export default function ThemeToggle() {
    const intl = useIntl();
    const { theme, setTheme } = useTheme();

    // Cycle through themes: light -> dark -> system -> light
    const cycleTheme = () => {
        const themes: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case 'dark':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                );
            case 'system':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    const getLabel = () => {
        return intl.formatMessage({ id: `theme.${theme}` });
    };

    return (
        <button
            onClick={cycleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-[rgb(var(--color-surface-hover))]"
            style={{ color: 'rgb(var(--color-text))' }}
            aria-label={getLabel()}
            title={getLabel()}
        >
            <motion.div
                key={theme}
                initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.2 }}
            >
                {getIcon()}
            </motion.div>
            <span className="text-sm font-medium hidden sm:inline">{getLabel()}</span>
        </button>
    );
}
