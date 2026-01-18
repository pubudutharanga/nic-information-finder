'use client';

import { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import { parseNIC, type NICInfo } from '@/lib/nic-utils';

import NICInput from './components/NICInput';
import ResultsDisplay from './components/ResultsDisplay';
import InlineCalendar from './components/InlineCalendar';
import LiveClock from './components/LiveClock';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import AdPlaceholder from './components/AdPlaceholder';
import SocialShare from './components/SocialShare';
import HistorySection from './components/HistorySection';
import FAQSection from './components/FAQSection';
import EducationalSection from './components/EducationalSection';

export default function MainPageClient() {
    const intl = useIntl();
    const [nicInfo, setNicInfo] = useState<NICInfo | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleValidNIC = useCallback((nic: string) => {
        try {
            const info = parseNIC(nic);
            setNicInfo(info);
        } catch {
            setNicInfo(null);
        }
    }, []);

    const handleInvalidNIC = useCallback(() => {
        setNicInfo(null);
    }, []);

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[rgb(var(--color-border))] no-print">
                <div className="container py-4 md:py-5 flex items-center justify-between">
                    <LiveClock />
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main id="main-content" className="container py-8 space-y-16" role="main">
                {/* Hero */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                    aria-labelledby="hero-title"
                >
                    <h1 id="hero-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
                        {intl.formatMessage({ id: 'header.title' })}
                    </h1>
                    <p className="text-lg md:text-xl mb-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        {intl.formatMessage({ id: 'header.subtitle' })}
                    </p>
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
                        style={{ background: 'rgb(var(--color-success) / 0.1)', color: 'rgb(var(--color-success))' }}
                        role="status"
                        aria-label="Privacy guarantee"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {intl.formatMessage({ id: 'header.tagline' })}
                    </div>
                </motion.section>

                <AdPlaceholder size="728x90" position="header-banner" />

                {/* NIC Decoder Section - Primary Tool */}
                <motion.section
                    id="nic-decoder"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 md:p-10 max-w-2xl mx-auto"
                    aria-labelledby="decoder-title"
                >
                    <h2 id="decoder-title" className="sr-only">
                        {intl.formatMessage({ id: 'input.label' })}
                    </h2>
                    <NICInput onValidNIC={handleValidNIC} onInvalidNIC={handleInvalidNIC} />

                    {nicInfo && (
                        <ResultsDisplay nicInfo={nicInfo} onBirthdayClick={() => setShowCalendar(!showCalendar)} />
                    )}

                    {nicInfo && showCalendar && (
                        <div className="mt-6">
                            <InlineCalendar birthDate={nicInfo.birthday} onClose={() => setShowCalendar(false)} />
                        </div>
                    )}
                </motion.section>

                <AdPlaceholder size="300x250" position="in-content-rectangle" />

                {/* Below-fold content with performance optimization */}
                <div className="below-fold space-y-16">
                    <EducationalSection />

                    <HistorySection />

                    <FAQSection />
                </div>

                {/* Privacy Section */}
                <section
                    id="privacy"
                    className="glass-card p-6 md:p-8 max-w-2xl mx-auto text-center below-fold"
                    style={{ background: 'rgb(var(--color-success) / 0.05)' }}
                    aria-labelledby="privacy-title"
                >
                    <div className="text-4xl mb-4" aria-hidden="true">🔒</div>
                    <h2 id="privacy-title" className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--color-text))' }}>
                        {intl.formatMessage({ id: 'privacy.title' })}
                    </h2>
                    <p className="mb-4" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        {intl.formatMessage({ id: 'privacy.description' })}
                    </p>
                    <ul className="space-y-2 text-sm inline-block text-left" role="list">
                        {[0, 1, 2, 3].map((i) => (
                            <li key={i} className="flex items-center gap-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                                <svg className="w-4 h-4" style={{ color: 'rgb(var(--color-success))' }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {intl.formatMessage({ id: `privacy.points.${i}` })}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Share Section */}
                <section id="share" className="text-center below-fold" aria-labelledby="share-title">
                    <h2 id="share-title" className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
                        {intl.formatMessage({ id: 'share.title' })}
                    </h2>
                    <SocialShare />
                </section>

                {/* Disclaimer */}
                <section id="disclaimer" className="text-center max-w-2xl mx-auto text-sm below-fold" style={{ color: 'rgb(var(--color-text-secondary))' }} aria-labelledby="disclaimer-title">
                    <h3 id="disclaimer-title" className="font-semibold mb-1">{intl.formatMessage({ id: 'disclaimer.title' })}</h3>
                    <p>{intl.formatMessage({ id: 'disclaimer.text' })}</p>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-8 mt-16 no-print" style={{ borderColor: 'rgb(var(--color-border))' }}>
                <div className="container text-center">
                    <p className="text-sm mb-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        {intl.formatMessage({ id: 'footer.copyright' })}
                    </p>
                    <p className="text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        {intl.formatMessage({ id: 'footer.developedBy' })}
                    </p>

                </div>
            </footer>

            <AdPlaceholder size="320x50" position="mobile-sticky-bottom" />
        </div>
    );
}
