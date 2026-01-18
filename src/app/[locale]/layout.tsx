import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { locales, localeToHreflang, localeToOG, type Locale } from '@/lib/i18n';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { IntlProvider } from '@/providers/IntlProvider';

// Import messages for metadata
import enMessages from '../../../messages/en.json';
import siMessages from '../../../messages/si.json';
import taMessages from '../../../messages/ta.json';

const messages = { en: enMessages, si: siMessages, ta: taMessages };

// Optimize font loading with display: swap for performance
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

/**
 * Generate static params for all locales
 * This enables Static Site Generation (SSG) for optimal performance
 */
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

/**
 * Dynamic metadata generation per locale
 * Critical for SEO and social sharing
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale: rawLocale } = await params;
    const locale = (locales.includes(rawLocale as Locale) ? rawLocale : 'en') as Locale;
    const msg = messages[locale]?.meta || messages.en.meta;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nic.lk';
    const currentUrl = `${baseUrl}/${locale}`;

    return {
        title: msg.title,
        description: msg.description,
        keywords: msg.keywords,

        // Author and generator info
        authors: [{ name: 'Pubudu Tharanga', url: 'https://pubudu-tharanga.vercel.app' }],
        generator: 'Next.js',

        // Canonical and alternate language URLs
        alternates: {
            canonical: currentUrl,
            languages: {
                'en-LK': `${baseUrl}/en`,
                'si-LK': `${baseUrl}/si`,
                'ta-LK': `${baseUrl}/ta`,
                'x-default': `${baseUrl}/en`,
            },
        },

        // Open Graph for social sharing
        openGraph: {
            title: msg.title,
            description: msg.description,
            url: currentUrl,
            siteName: 'Sri Lankan NIC Information Finder',
            locale: localeToOG[locale],
            alternateLocale: Object.values(localeToOG).filter(l => l !== localeToOG[locale]),
            type: 'website',
            countryName: 'Sri Lanka',
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: msg.title,
                    type: 'image/png',
                },
            ],
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: msg.title,
            description: msg.description,
            images: [`${baseUrl}/og-image.png`],
            creator: '@pubudutharanga',
        },

        // Additional metadata for SEO
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Verification (add your actual verification codes)
        verification: {
            google: 'your-google-verification-code',
        },

        // App-specific metadata
        applicationName: 'Sri Lankan NIC Finder',
        category: 'Utility',
        creator: 'Pubudu Tharanga',
        publisher: 'Sri Lankan NIC Finder',

        // Additional SEO meta tags
        other: {
            'geo.region': 'LK',
            'geo.country': 'Sri Lanka',
            'geo.placename': 'Sri Lanka',
            'revisit-after': '7 days',
            'rating': 'General',
            'distribution': 'global',
            'target': 'all',
            'HandheldFriendly': 'true',
            'MobileOptimized': '320',
            'format-detection': 'telephone=no',
        },
    };
}

/**
 * Viewport configuration for mobile optimization
 */
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#8B1538' },
        { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
    ],
};

/**
 * Root Layout Component
 * 
 * This is the main layout wrapper that provides:
 * - Theme context for dark/light mode
 * - Internationalization context
 * - Semantic HTML structure for SEO
 * - Accessibility features (skip-to-content link)
 */
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    // Validate locale and fallback to 'en' if invalid
    const locale: Locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'en';
    const msg = messages[locale] || messages.en;
    const langCode = localeToHreflang[locale]?.split('-')[0] || 'en';

    return (
        <html lang={langCode} suppressHydrationWarning>
            <head>
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Favicon and app icons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />

                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-FLEV55JTJJ"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-FLEV55JTJJ');
                    `}
                </Script>
            </head>
            <body className={`${inter.variable} antialiased`}>
                <ThemeProvider>
                    <IntlProvider locale={locale}>
                        {/* Skip to content link for accessibility */}
                        <a href="#main-content" className="skip-to-content">
                            {msg.skipToContent || 'Skip to main content'}
                        </a>

                        {children}
                    </IntlProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
