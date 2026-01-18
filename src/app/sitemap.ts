import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

/**
 * Dynamic Sitemap Generation
 * 
 * Generates XML sitemap with all locale variations.
 * This is critical for SEO as it:
 * - Helps search engines discover all pages
 * - Indicates language variants via hreflang
 * - Sets priority for crawler importance
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nic.lk';

    // Generate entries for each locale
    const localeEntries = locales.map((locale) => ({
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
        alternates: {
            languages: {
                en: `${baseUrl}/en`,
                si: `${baseUrl}/si`,
                ta: `${baseUrl}/ta`,
            },
        },
    }));

    // Root URL redirects to default locale
    const rootEntry = {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    };

    return [rootEntry, ...localeEntries];
}
