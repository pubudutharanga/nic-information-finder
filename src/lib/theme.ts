/**
 * Theme Configuration
 * 
 * Sri Lankan flag-inspired color palette:
 * - Saffron/Orange: Represents the Tamil minority
 * - Green: Represents the Muslim minority  
 * - Maroon: Represents the Sinhalese majority
 * - Yellow: The lion border
 */

export interface ThemeColors {
    // Primary colors
    primary: string;
    primaryDark: string;
    primaryLight: string;

    // Accent colors
    accent: string;
    accentDark: string;

    // Semantic colors
    success: string;
    error: string;
    warning: string;
    info: string;

    // Neutrals
    background: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textSecondary: string;
    border: string;
}

export const lightTheme: ThemeColors = {
    // Sri Lankan maroon as primary
    primary: '#8B1538',      // Deep maroon
    primaryDark: '#6B0F2A',  // Darker maroon
    primaryLight: '#A82048', // Lighter maroon

    // Saffron/orange as accent
    accent: '#FF8C00',       // Saffron orange
    accentDark: '#CC7000',   // Darker saffron

    // Semantic colors
    success: '#10B981',      // Green
    error: '#EF4444',        // Red
    warning: '#F59E0B',      // Amber
    info: '#3B82F6',         // Blue

    // Light mode neutrals
    background: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceHover: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
};

export const darkTheme: ThemeColors = {
    // Slightly lighter maroon for dark mode
    primary: '#D4366A',
    primaryDark: '#A82048',
    primaryLight: '#E85A8C',

    // Brighter saffron for dark mode
    accent: '#FFB347',
    accentDark: '#FF8C00',

    // Semantic colors (slightly adjusted for dark mode)
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    info: '#60A5FA',

    // Dark mode neutrals
    background: '#0F172A',
    surface: '#1E293B',
    surfaceHover: '#334155',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
};

export type Theme = 'light' | 'dark' | 'system';

export const themeIcons = {
    light: '☀️',
    dark: '🌙',
    system: '💻',
};
