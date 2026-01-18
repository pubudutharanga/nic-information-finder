'use client';

import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';

export default function HistorySection() {
    const intl = useIntl();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="w-full max-w-4xl mx-auto mt-16 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-12"
            >
                {/* Main Introduction */}
                <motion.div variants={itemVariants} className="text-center space-y-4">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))]">
                        {intl.formatMessage({ id: 'history.title' })}
                    </h2>
                    <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        {intl.formatMessage({ id: 'history.intro' })}
                    </p>
                </motion.div>

                {/* Evolution & Importance Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Evolution */}
                    <motion.div
                        variants={itemVariants}
                        className="glass-card p-8 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(var(--color-primary))] opacity-5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-[rgb(var(--color-primary))/10] text-[rgb(var(--color-primary))]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>
                                {intl.formatMessage({ id: 'history.evolution.title' })}
                            </h3>
                        </div>

                        <p className="leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                            {intl.formatMessage({ id: 'history.evolution.text' })}
                        </p>
                    </motion.div>

                    {/* Importance */}
                    <motion.div
                        variants={itemVariants}
                        className="glass-card p-8 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(var(--color-secondary))] opacity-5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-[rgb(var(--color-secondary))/10] text-[rgb(var(--color-secondary))]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>
                                {intl.formatMessage({ id: 'history.importance.title' })}
                            </h3>
                        </div>

                        <p className="mb-4 leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                            {intl.formatMessage({ id: 'history.importance.text' })}
                        </p>

                        <ul className="space-y-2">
                            {['0', '1', '2', '3'].map((idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[rgb(var(--color-secondary))] mt-1">•</span>
                                    <span style={{ color: 'rgb(var(--color-text-secondary))' }}>
                                        {intl.formatMessage({ id: `history.importance.list.${idx}` })}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
