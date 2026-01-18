'use client';

import { useIntl } from 'react-intl';
import { useRouter, usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { locales, localeNames, type Locale } from '@/lib/i18n';

/**
 * Language Switcher Component
 * 
 * A dropdown menu for switching between supported languages:
 * - English (en)
 * - Sinhala (si) - සිංහල
 * - Tamil (ta) - தமிழ்
 * 
 * Updates the URL and persists preference to localStorage.
 */
export default function LanguageSwitcher() {
    const intl = useIntl();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const currentLocale = intl.locale as Locale;

    const handleLocaleChange = (newLocale: Locale) => {
        if (newLocale === currentLocale) return;

        // Build new pathname with new locale
        const segments = pathname.split('/').filter(Boolean);
        segments[0] = newLocale; // Replace locale segment
        const newPath = '/' + segments.join('/');

        // Store preference
        localStorage.setItem('NEXT_LOCALE', newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

        router.push(newPath);
    };

    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger asChild>
                <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-[rgb(var(--color-surface-hover))]"
                    style={{ color: 'rgb(var(--color-text))' }}
                    aria-label={intl.formatMessage({ id: 'language.select' })}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-sm font-medium">{localeNames[currentLocale]}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </DropdownMenu.Trigger>

            <AnimatePresence>
                {isOpen && (
                    <DropdownMenu.Portal forceMount>
                        <DropdownMenu.Content
                            asChild
                            align="end"
                            sideOffset={8}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                transition={{ duration: 0.15 }}
                                className="min-w-[140px] rounded-lg p-1 z-50"
                                style={{
                                    background: 'rgb(var(--color-surface))',
                                    border: '1px solid rgb(var(--color-border))',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                {locales.map((locale) => (
                                    <DropdownMenu.Item
                                        key={locale}
                                        onSelect={() => handleLocaleChange(locale)}
                                        className={`
                      flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer outline-none
                      transition-colors hover:bg-[rgb(var(--color-surface-hover))]
                      ${locale === currentLocale ? 'font-semibold' : ''}
                    `}
                                        style={{ color: 'rgb(var(--color-text))' }}
                                    >
                                        <span className="text-lg">
                                            {locale === 'en' ? '🇬🇧' : locale === 'si' ? '🇱🇰' : '🇱🇰'}
                                        </span>
                                        <span className="text-sm">{localeNames[locale]}</span>
                                        {locale === currentLocale && (
                                            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </DropdownMenu.Item>
                                ))}
                            </motion.div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                )}
            </AnimatePresence>
        </DropdownMenu.Root>
    );
}
