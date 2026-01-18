import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, getPreferredLocale, isValidLocale } from '@/lib/i18n';

/**
 * Middleware for handling internationalization (i18n)
 * 
 * This middleware:
 * 1. Detects the user's preferred locale from cookies or Accept-Language header
 * 2. Redirects to the appropriate locale-prefixed URL
 * 3. Preserves locale preference in a cookie for future visits
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

    // Redirect to locale-prefixed URL
    const newUrl = new URL(
        `/${preferredLocale}${pathname === '/' ? '' : pathname}`,
        request.url
    );

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
    matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)'],
};
