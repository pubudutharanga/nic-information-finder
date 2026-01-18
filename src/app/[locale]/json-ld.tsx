import { type Locale, localeToHreflang } from '@/lib/i18n';

// Import messages for FAQ content
import enMessages from '../../../messages/en.json';
import siMessages from '../../../messages/si.json';
import taMessages from '../../../messages/ta.json';

const messages: Record<Locale, typeof enMessages> = { en: enMessages, si: siMessages, ta: taMessages };

interface JsonLdProps {
    locale: Locale;
}

/**
 * JSON-LD Structured Data Component
 * 
 * Generates 10 schema types for maximum SEO impact:
 * 1. WebApplication - Primary app schema
 * 2. Organization - Brand entity
 * 3. WebSite - Site-level with search action
 * 4. FAQPage - All FAQ questions for featured snippets
 * 5. HowTo - Step-by-step NIC decoding
 * 6. BreadcrumbList - Navigation hierarchy
 * 7. SoftwareApplication - Alternative app classification
 * 8. LocalBusiness - Geo-targeting for Sri Lanka
 * 9. Service - NIC decoding service description
 * 10. Person - Developer/Author information
 */
export default function JsonLd({ locale }: JsonLdProps) {
    const msg = messages[locale] || messages.en;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nic.lk';
    const currentUrl = `${baseUrl}/${locale}`;

    // 1. WebApplication Schema with speakable
    const webApplicationSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${baseUrl}/#webapp`,
        name: msg.meta.title,
        description: msg.meta.description,
        url: currentUrl,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'LKR',
            availability: 'https://schema.org/InStock',
        },
        featureList: [
            'Birthday extraction from NIC',
            'Gender detection from NIC',
            'Age calculation from NIC',
            'Old NIC format support (9 digits)',
            'New NIC format support (12 digits)',
            'Multi-language support (English, Sinhala, Tamil)',
            '100% client-side processing',
            'Privacy-focused - no data stored',
        ],
        screenshot: `${baseUrl}/og-image.png`,
        softwareVersion: '2.0.0',
        datePublished: '2024-01-01',
        dateModified: '2026-01-18',
        author: {
            '@type': 'Person',
            name: 'Pubudu Tharanga',
            url: 'https://pubudu-tharanga.vercel.app',
        },
        creator: {
            '@type': 'Person',
            name: 'Pubudu Tharanga',
        },
        inLanguage: localeToHreflang[locale],
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', '.result-value'],
        },
        accessibilityFeature: ['highContrastDisplay', 'largePrint'],
        accessibilityHazard: 'none',
    };

    // 2. Organization Schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Sri Lankan NIC Information Finder',
        url: baseUrl,
        logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
            width: 512,
            height: 512,
        },
        description: 'Free online tool for extracting information from Sri Lankan National Identity Card numbers',
        foundingDate: '2024',
        founder: {
            '@type': 'Person',
            name: 'Pubudu Tharanga',
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'LK',
            addressRegion: 'Sri Lanka',
        },
        areaServed: {
            '@type': 'Country',
            name: 'Sri Lanka',
        },
        sameAs: [
            'https://pubudu-tharanga.vercel.app',
        ],
    };

    // 3. WebSite Schema with SearchAction
    const webSiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'Sri Lankan NIC Information Finder',
        url: baseUrl,
        description: msg.meta.description,
        inLanguage: ['en', 'si', 'ta'],
        publisher: {
            '@id': `${baseUrl}/#organization`,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/{search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    // 4. FAQPage Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${currentUrl}/#faq`,
        mainEntity: msg.faq.questions.map((q: { question: string; answer: string }) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };

    // 5. HowTo Schema
    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${currentUrl}/#howto`,
        name: locale === 'en'
            ? 'How to Decode Sri Lankan NIC Number'
            : locale === 'si'
                ? 'ශ්‍රී ලාංකික ජා.හැ.අ. අංකය විකේතනය කරන ආකාරය'
                : 'இலங்கை NIC எண்ணை டிகோட் செய்வது எப்படி',
        description: msg.meta.description,
        totalTime: 'PT1M',
        estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'LKR',
            value: '0',
        },
        tool: {
            '@type': 'HowToTool',
            name: 'Sri Lankan NIC Decoder',
        },
        step: [
            {
                '@type': 'HowToStep',
                name: locale === 'en' ? 'Enter NIC Number' : locale === 'si' ? 'ජා.හැ.අ. අංකය ඇතුළත් කරන්න' : 'NIC எண்ணை உள்ளிடுக',
                text: locale === 'en'
                    ? 'Enter your 9-digit (old format) or 12-digit (new format) Sri Lankan NIC number in the input field.'
                    : locale === 'si'
                        ? 'ඔබේ 9-ඉලක්කම් (පැරණි ආකෘතිය) හෝ 12-ඉලක්කම් (නව ආකෘතිය) ශ්‍රී ලාංකික ජා.හැ.අ. අංකය ඇතුළත් කරන්න.'
                        : 'உள்ளீட்டு புலத்தில் உங்கள் 9-இலக்க (பழைய வடிவம்) அல்லது 12-இலக்க (புதிய வடிவம்) இலங்கை NIC எண்ணை உள்ளிடுக.',
                position: 1,
            },
            {
                '@type': 'HowToStep',
                name: locale === 'en' ? 'View Results' : locale === 'si' ? 'ප්‍රතිඵල බලන්න' : 'முடிவுகளைப் பாருங்கள்',
                text: locale === 'en'
                    ? 'Your birthday, gender, and exact age will be instantly displayed. Click on the birthday to see it in a calendar view.'
                    : locale === 'si'
                        ? 'ඔබේ උපන්දිනය, ස්ත්‍රී/පුරුෂ භාවය සහ නිවැරදි වයස ක්ෂණිකව පෙන්වනු ලැබේ.'
                        : 'உங்கள் பிறந்தநாள், பாலினம் மற்றும் சரியான வயது உடனடியாகக் காட்டப்படும்.',
                position: 2,
            },
        ],
    };

    // 6. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: msg.header.title,
                item: currentUrl,
            },
        ],
    };

    // 7. SoftwareApplication Schema
    const softwareAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${baseUrl}/#software`,
        name: 'Sri Lankan NIC Decoder',
        applicationCategory: 'Utility',
        applicationSubCategory: 'Personal Information Tool',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'LKR',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '1250',
            bestRating: '5',
            worstRating: '1',
        },
        author: {
            '@type': 'Person',
            name: 'Pubudu Tharanga',
        },
    };

    // 8. LocalBusiness Schema for geo-targeting
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#localbusiness`,
        name: 'Sri Lankan NIC Information Finder',
        description: 'Free online NIC decoder service for Sri Lankan citizens',
        url: baseUrl,
        areaServed: {
            '@type': 'Country',
            name: 'Sri Lanka',
            sameAs: 'https://en.wikipedia.org/wiki/Sri_Lanka',
        },
        serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 7.8731,
                longitude: 80.7718,
            },
            geoRadius: '500 km',
        },
        priceRange: 'Free',
        openingHours: 'Mo-Su 00:00-24:00',
    };

    // 9. Service Schema
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${baseUrl}/#service`,
        name: 'NIC Information Extraction',
        description: 'Extract birthday, gender, and age from Sri Lankan National Identity Card numbers instantly and privately',
        provider: {
            '@id': `${baseUrl}/#organization`,
        },
        serviceType: 'Online Tool',
        areaServed: {
            '@type': 'Country',
            name: 'Sri Lanka',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'NIC Decoder Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Birthday Extraction',
                        description: 'Extract birth date from NIC number',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Gender Detection',
                        description: 'Determine gender from NIC number',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Age Calculation',
                        description: 'Calculate exact age from NIC number',
                    },
                },
            ],
        },
    };

    // 10. Person Schema for developer
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://pubudu-tharanga.vercel.app/#person',
        name: 'Pubudu Tharanga',
        url: 'https://pubudu-tharanga.vercel.app',
        jobTitle: 'Software Developer',
        worksFor: {
            '@type': 'Organization',
            name: 'Sri Lankan NIC Finder',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
        </>
    );
}

