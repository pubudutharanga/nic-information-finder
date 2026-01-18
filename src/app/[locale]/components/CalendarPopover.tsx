'use client';

import { useIntl } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';
import * as Popover from '@radix-ui/react-popover';
import { useState, useMemo } from 'react';

interface CalendarPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    birthDate: Date;
    trigger: React.ReactNode;
}

/**
 * Calendar Popover Component
 * 
 * An accessible calendar popover using Radix UI with:
 * - Birth date highlighted
 * - Month/year navigation
 * - Smooth spring animations via Framer Motion
 * - Keyboard navigation support
 * - Close on outside click or ESC
 */
export default function CalendarPopover({ isOpen, onClose, birthDate, trigger }: CalendarPopoverProps) {
    const intl = useIntl();

    // Current view state (which month/year is being displayed)
    const [viewDate, setViewDate] = useState(() => new Date(birthDate));

    // Get localized month and day names
    const monthNames = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(2000, i, 1);
            return new Intl.DateTimeFormat(intl.locale, { month: 'long' }).format(date);
        });
    }, [intl.locale]);

    const dayNames = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(2000, 0, 2 + i); // Start from Sunday
            return new Intl.DateTimeFormat(intl.locale, { weekday: 'short' }).format(date);
        });
    }, [intl.locale]);

    // Calculate days in the current view month
    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay(); // 0 = Sunday

        // Days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Create array of day objects
        const days: { date: number; isCurrentMonth: boolean; isBirthDate: boolean; isToday: boolean }[] = [];

        // Previous month padding
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            days.push({
                date: prevMonthDays - i,
                isCurrentMonth: false,
                isBirthDate: false,
                isToday: false,
            });
        }

        // Current month days
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const isBirthDate =
                birthDate.getDate() === i &&
                birthDate.getMonth() === month &&
                birthDate.getFullYear() === year;

            const isToday =
                today.getDate() === i &&
                today.getMonth() === month &&
                today.getFullYear() === year;

            days.push({
                date: i,
                isCurrentMonth: true,
                isBirthDate,
                isToday,
            });
        }

        // Next month padding (fill to 6 rows = 42 cells)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                isBirthDate: false,
                isToday: false,
            });
        }

        return days;
    }, [viewDate, birthDate]);

    // Navigation handlers
    const goToPrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const goToBirthDate = () => {
        setViewDate(new Date(birthDate));
    };

    return (
        <Popover.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Popover.Trigger asChild>
                {trigger}
            </Popover.Trigger>

            <AnimatePresence>
                {isOpen && (
                    <Popover.Portal forceMount>
                        <Popover.Content
                            asChild
                            side="bottom"
                            align="center"
                            sideOffset={8}
                            onEscapeKeyDown={onClose}
                            onPointerDownOutside={onClose}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
                                className="glass-card p-4 w-80 z-50"
                                style={{
                                    background: 'rgb(var(--color-surface))',
                                    border: '1px solid rgb(var(--color-border))'
                                }}
                            >
                                {/* Header with navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={goToPrevMonth}
                                        className="p-2 rounded-lg hover:bg-[rgb(var(--color-surface-hover))] transition-colors"
                                        aria-label="Previous month"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <div className="text-center">
                                        <h3 className="font-semibold" style={{ color: 'rgb(var(--color-text))' }}>
                                            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                                        </h3>
                                    </div>

                                    <button
                                        onClick={goToNextMonth}
                                        className="p-2 rounded-lg hover:bg-[rgb(var(--color-surface-hover))] transition-colors"
                                        aria-label="Next month"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Day names header */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {dayNames.map((day) => (
                                        <div
                                            key={day}
                                            className="text-center text-xs font-medium py-1"
                                            style={{ color: 'rgb(var(--color-text-secondary))' }}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {calendarDays.map((day, index) => (
                                        <div
                                            key={index}
                                            className={`
                        aspect-square flex items-center justify-center text-sm rounded-lg
                        ${!day.isCurrentMonth ? 'opacity-30' : ''}
                        ${day.isBirthDate ? 'font-bold' : ''}
                      `}
                                            style={{
                                                background: day.isBirthDate
                                                    ? 'rgb(var(--color-primary))'
                                                    : day.isToday
                                                        ? 'rgb(var(--color-accent) / 0.2)'
                                                        : 'transparent',
                                                color: day.isBirthDate
                                                    ? 'white'
                                                    : 'rgb(var(--color-text))',
                                            }}
                                        >
                                            {day.date}
                                        </div>
                                    ))}
                                </div>

                                {/* Legend / Jump to birth date */}
                                <div className="mt-4 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded"
                                            style={{ background: 'rgb(var(--color-primary))' }}
                                        />
                                        <span style={{ color: 'rgb(var(--color-text-secondary))' }}>
                                            {intl.formatMessage({ id: 'calendar.birthDate' })}
                                        </span>
                                    </div>

                                    <button
                                        onClick={goToBirthDate}
                                        className="px-3 py-1 rounded-md text-xs font-medium transition-colors"
                                        style={{
                                            background: 'rgb(var(--color-primary) / 0.1)',
                                            color: 'rgb(var(--color-primary))'
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'calendar.birthDate' })}
                                    </button>
                                </div>
                            </motion.div>
                        </Popover.Content>
                    </Popover.Portal>
                )}
            </AnimatePresence>
        </Popover.Root>
    );
}
