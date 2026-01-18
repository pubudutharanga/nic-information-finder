'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { ReactNode } from 'react';
import { Locale } from '@/lib/i18n';

// Import message files
import enMessages from '../../messages/en.json';
import siMessages from '../../messages/si.json';
import taMessages from '../../messages/ta.json';

const messages: Record<Locale, Record<string, unknown>> = {
    en: enMessages,
    si: siMessages,
    ta: taMessages,
};

// Flatten nested message objects for react-intl, including arrays
function flattenMessages(
    obj: Record<string, unknown>,
    prefix = ''
): Record<string, string> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {
            // Handle arrays by indexing each element
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    Object.assign(acc, flattenMessages(item as Record<string, unknown>, `${newKey}.${index}`));
                } else if (typeof item === 'string') {
                    acc[`${newKey}.${index}`] = item;
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            Object.assign(acc, flattenMessages(value as Record<string, unknown>, newKey));
        } else if (typeof value === 'string') {
            acc[newKey] = value;
        }

        return acc;
    }, {} as Record<string, string>);
}

interface IntlProviderProps {
    locale: Locale;
    children: ReactNode;
}

export function IntlProvider({ locale, children }: IntlProviderProps) {
    const localeMessages = messages[locale] || messages.en;
    const flatMessages = flattenMessages(localeMessages);

    return (
        <ReactIntlProvider
            locale={locale}
            messages={flatMessages}
            defaultLocale="en"
            onError={(err) => {
                // Suppress missing translation warnings in development
                if (err.code === 'MISSING_TRANSLATION') {
                    console.warn('Missing translation:', err.message);
                    return;
                }
                console.error(err);
            }}
        >
            {children}
        </ReactIntlProvider>
    );
}
