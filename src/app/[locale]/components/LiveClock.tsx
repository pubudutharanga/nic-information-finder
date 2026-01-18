'use client';

import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

/**
 * Live Clock Component
 * 
 * Displays the current date and time with:
 * - Auto-update every second
 * - Locale-aware formatting
 * - Full date with day name
 */
export default function LiveClock() {
    const intl = useIntl();
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    // Update time every second
    useEffect(() => {
        // Set initial time
        setCurrentTime(new Date());

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Don't render until client-side to avoid hydration mismatch
    if (!currentTime) {
        return (
            <div
                className="text-sm font-medium animate-pulse"
                style={{ color: 'rgb(var(--color-text-secondary))' }}
                aria-label={intl.formatMessage({ id: 'clock.label' })}
            >
                --:--:--
            </div>
        );
    }

    // Format date: "Sunday, January 18, 2026"
    const formattedDate = new Intl.DateTimeFormat(intl.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(currentTime);

    // Format time: "3:45:23 PM"
    const formattedTime = new Intl.DateTimeFormat(intl.locale, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(currentTime);

    return (
        <div
            className="text-sm font-medium"
            style={{ color: 'rgb(var(--color-text-secondary))' }}
            aria-label={intl.formatMessage({ id: 'clock.label' })}
            role="timer"
            aria-live="polite"
        >
            <span className="hidden sm:inline">{formattedDate} | </span>
            <span className="font-mono">{formattedTime}</span>
        </div>
    );
}
