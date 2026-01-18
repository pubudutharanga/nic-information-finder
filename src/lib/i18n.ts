/**
 * Internationalization Configuration
 * 
 * Configures supported locales and provides utility functions for i18n.
 * Next.js App Router compatible with [locale] dynamic segment.
 */

export const locales = ['en', 'si', 'ta'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
};

// Locale to hreflang mapping
export const localeToHreflang: Record<Locale, string> = {
  en: 'en-LK',
  si: 'si-LK',
  ta: 'ta-LK',
};

// Locale to Open Graph locale mapping
export const localeToOG: Record<Locale, string> = {
  en: 'en_LK',
  si: 'si_LK',
  ta: 'ta_LK',
};

/**
 * Validates if a string is a supported locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Gets the locale from a pathname
 * Example: /en/about -> 'en', /si -> 'si'
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLocale;
}

/**
 * Removes locale prefix from pathname
 * Example: /en/about -> /about
 */
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  return pathname.replace(new RegExp(`^/${locale}`), '') || '/';
}

/**
 * Adds locale prefix to pathname
 * Example: /about, 'si' -> /si/about
 */
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * Gets the preferred locale from browser settings
 */
export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality = 'q=1'] = lang.trim().split(';');
      return {
        code: code.toLowerCase().split('-')[0],
        quality: parseFloat(quality.replace('q=', '')) || 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find first matching locale
  for (const { code } of languages) {
    if (isValidLocale(code)) {
      return code;
    }
  }
  
  return defaultLocale;
}
