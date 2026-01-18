import { type Locale } from '@/lib/i18n';
import JsonLd from './json-ld';
import MainPageClient from './MainPageClient';

/**
 * Main Page (Server Component)
 * 
 * This is the entry page for each locale.
 * It renders:
 * - JSON-LD structured data (server-rendered for SEO)
 * - Main interactive client component
 * 
 * Using a server component wrapper allows us to:
 * 1. Render JSON-LD schemas server-side for immediate crawler access
 * 2. Keep SEO-critical content in the initial HTML
 * 3. Hydrate interactive features on the client
 */
export default async function Page({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    return (
        <>
            {/* JSON-LD Structured Data - Critical for SEO */}
            <JsonLd locale={locale} />

            {/* Main Interactive Content */}
            <MainPageClient />
        </>
    );
}
