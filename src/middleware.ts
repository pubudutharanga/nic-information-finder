import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, getPreferredLocale, isValidLocale } from '@/lib/i18n';

/**
 * Known search engine and social media crawler user-agent patterns.
 * When these bots visit the root URL, we serve content via rewrite
 * instead of redirecting, so they see a 200 OK and can index the page.
 */
const BOT_PATTERNS = [
    'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider',
    'slurp', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegrambot', 'applebot', 'petalbot',
];

/**
 * Check if the request comes from a known search engine or social media bot.
 */
function isBot(userAgent: string | null): boolean {
    if (!userAgent) return false;
    const ua = userAgent.toLowerCase();
    return BOT_PATTERNS.some(bot => ua.includes(bot));
}

/**
 * Middleware for handling internationalization (i18n)
 * 
 * This middleware:
 * 1. Detects the user's preferred locale from cookies or Accept-Language header
 * 2. For bots: rewrites to locale URL (serves content at root, no redirect)
 * 3. For humans: redirects (307) to the locale-prefixed URL
 * 4. Preserves locale preference in a cookie for future visits
 * 
 * Routes are structured as: /[locale]/... (e.g., /en, /si/about)
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a valid locale
    const pathnameLocale = pathname.split('/')[1];
    const hasLocale = locales.some(locale => locale === pathnameLocale);

    if (hasLocale) {
        // Set locale cookie for preference persistence
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', pathnameLocale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 year
            sameSite: 'lax',
        });
        return response;
    }

    // Get preferred locale from cookie or Accept-Language header
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const preferredLocale = cookieLocale && isValidLocale(cookieLocale)
        ? cookieLocale
        : getPreferredLocale(request.headers.get('accept-language'));

    const newUrl = new URL(
        `/${preferredLocale}${pathname === '/' ? '' : pathname}`,
        request.url
    );

    const userAgent = request.headers.get('user-agent');

    // For bots: rewrite to serve content directly at the current URL (200 OK)
    // This prevents Google from reporting "Redirect error" in Search Console
    if (isBot(userAgent)) {
        const response = NextResponse.rewrite(newUrl);
        return response;
    }

    // For humans: 307 Temporary Redirect to locale-prefixed URL
    // A temporary redirect tells Google the redirection is dynamic
    // and depends on the user's language settings
    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', preferredLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
    });

    return response;
}

export const config = {
    // Match all paths except static files
    matcher: ['/', '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\\\.).*)'],
};
