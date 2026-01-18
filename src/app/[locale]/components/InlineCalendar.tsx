'use client';

import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface InlineCalendarProps {
    birthDate: Date;
    onClose: () => void;
}

/**
 * Inline Calendar Component
 * 
 * A simple inline calendar that highlights the birth date.
 * Displayed directly in the page (no popover complexity).
 */
export default function InlineCalendar({ birthDate, onClose }: InlineCalendarProps) {
    const intl = useIntl();

    const year = birthDate.getFullYear();
    const month = birthDate.getMonth();
    const day = birthDate.getDate();

    // Get localized month name
    const monthName = new Intl.DateTimeFormat(intl.locale, { month: 'long' }).format(birthDate);

    // Get localized day names
    const dayNames = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(2000, 0, 2 + i);
            return new Intl.DateTimeFormat(intl.locale, { weekday: 'short' }).format(date);
        });
    }, [intl.locale]);

    // Calculate calendar grid
    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days: { date: number; isCurrentMonth: boolean; isBirthDate: boolean }[] = [];

        // Previous month padding
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            days.push({ date: prevMonthDays - i, isCurrentMonth: false, isBirthDate: false });
        }

        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: i, isCurrentMonth: true, isBirthDate: i === day });
        }

        // Next month padding
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ date: i, isCurrentMonth: false, isBirthDate: false });
        }

        return days;
    }, [year, month, day]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-4 w-full max-w-sm mx-auto"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3
                    className="font-semibold"
                    style={{ color: 'rgb(var(--color-text))' }}
                >
                    {monthName} {year}
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-lg hover:bg-[rgb(var(--color-surface-hover))] transition-colors"
                    aria-label="Close calendar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((d) => (
                    <div
                        key={d}
                        className="text-center text-xs font-medium py-1"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((d, i) => (
                    <div
                        key={i}
                        className={`
              aspect-square flex items-center justify-center text-sm rounded-lg
              ${!d.isCurrentMonth ? 'opacity-30' : ''}
              ${d.isBirthDate ? 'font-bold' : ''}
            `}
                        style={{
                            background: d.isBirthDate ? 'rgb(var(--color-primary))' : 'transparent',
                            color: d.isBirthDate ? 'white' : 'rgb(var(--color-text))',
                        }}
                    >
                        {d.date}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                <div className="w-3 h-3 rounded" style={{ background: 'rgb(var(--color-primary))' }} />
                <span style={{ color: 'rgb(var(--color-text-secondary))' }}>
                    {intl.formatMessage({ id: 'calendar.birthDate' })}
                </span>
            </div>
        </motion.div>
    );
}
