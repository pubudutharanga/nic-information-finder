'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';
import type { NICInfo } from '@/lib/nic-utils';

interface ResultsDisplayProps {
    nicInfo: NICInfo | null;
    onBirthdayClick: () => void;
}

export default function ResultsDisplay({ nicInfo, onBirthdayClick }: ResultsDisplayProps) {
    const intl = useIntl();
    const [toast, setToast] = useState<{ show: boolean; x: number; y: number } | null>(null);

    if (!nicInfo) return null;

    const formattedBirthday = new Intl.DateTimeFormat(intl.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(nicInfo.birthday);

    const formatAgeUnit = (value: number, singular: string, plural: string) => {
        return `${value} ${value === 1 ? intl.formatMessage({ id: singular }) : intl.formatMessage({ id: plural })}`;
    };

    const ageString = [
        formatAgeUnit(nicInfo.age.years, 'age.year', 'age.years'),
        formatAgeUnit(nicInfo.age.months, 'age.month', 'age.months'),
        formatAgeUnit(nicInfo.age.days, 'age.day', 'age.days'),
    ].join(', ');

    const genderIcon = nicInfo.gender === 'male' ? '♂' : '♀';
    const genderLabel = intl.formatMessage({ id: `gender.${nicInfo.gender}` });
    const genderColor = nicInfo.gender === 'male' ? 'rgb(var(--color-info))' : 'rgb(var(--color-primary))';

    const handleCopy = (text: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent potentially triggering other clicks
        navigator.clipboard.writeText(text);

        // Get click coordinates for toast positioning
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        // Center the toast horizontally relative to the click, and place it above
        setToast({
            show: true,
            x: rect.left + (rect.width / 2),
            y: rect.top - 10
        });

        setTimeout(() => setToast(null), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-xl mx-auto mt-8 relative">
                <motion.h2 variants={itemVariants} className="text-xl font-bold mb-6 text-center" style={{ color: 'rgb(var(--color-text))' }}>
                    {intl.formatMessage({ id: 'result.title' })}
                </motion.h2>

                <div className="grid gap-4">
                    {/* Birthday */}
                    <motion.div variants={itemVariants} className="glass-card p-5 relative group cursor-pointer transition-colors active:scale-[0.99]" onClick={(e) => handleCopy(formattedBirthday, e)}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                                    {intl.formatMessage({ id: 'result.birthday' })}
                                </p>
                                <p className="text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>
                                    {formattedBirthday}
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent copy logic when clicking calendar icon
                                    onBirthdayClick();
                                }}
                                className="p-3 rounded-xl transition-all hover:scale-110 z-10"
                                style={{ background: 'rgb(var(--color-primary) / 0.1)', color: 'rgb(var(--color-primary))' }}
                                aria-label={intl.formatMessage({ id: 'result.viewCalendar' })}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[rgb(var(--color-primary))] opacity-10 transition-all pointer-events-none"></div>
                    </motion.div>

                    {/* Gender */}
                    <motion.div variants={itemVariants} className="glass-card p-5 relative group cursor-pointer transition-colors active:scale-[0.99]" onClick={(e) => handleCopy(genderLabel, e)}>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold" style={{ background: `${genderColor}20`, color: genderColor }}>
                                {genderIcon}
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                                    {intl.formatMessage({ id: 'result.gender' })}
                                </p>
                                <p className="text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{genderLabel}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[rgb(var(--color-info))] opacity-10 transition-all pointer-events-none"></div>
                    </motion.div>

                    {/* Age */}
                    <motion.div variants={itemVariants} className="glass-card p-5 relative group cursor-pointer transition-colors active:scale-[0.99]" onClick={(e) => handleCopy(ageString, e)}>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgb(var(--color-accent) / 0.15)', color: 'rgb(var(--color-accent))' }}>
                                🎂
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                                    {intl.formatMessage({ id: 'result.age' })}
                                </p>
                                <p className="text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{ageString}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[rgb(var(--color-accent))] opacity-10 transition-all pointer-events-none"></div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            left: toast.x,
                            top: toast.y,
                            transform: 'translate(-50%, -100%)',
                            zIndex: 100,
                            pointerEvents: 'none'
                        }}
                        className="px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-lg flex items-center gap-2"
                    >
                        <div className="absolute inset-0 rounded-lg opacity-90" style={{ background: 'rgb(var(--color-text))' }}></div>
                        <span className="relative z-10">
                            {intl.locale === 'si' ? 'පිටපත් කළා!' : intl.locale === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}
                        </span>
                        <svg className="w-3 h-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
