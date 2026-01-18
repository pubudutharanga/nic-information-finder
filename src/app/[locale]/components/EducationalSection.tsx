'use client';

import { useIntl } from 'react-intl';

/**
 * Educational Section Component
 * 
 * Explains the NIC format for SEO and user education.
 * Includes comparison table between old and new formats.
 */
export default function EducationalSection() {
    const intl = useIntl();

    return (
        <section className="w-full max-w-4xl mx-auto" aria-labelledby="education-heading">
            <h2
                id="education-heading"
                className="text-2xl md:text-3xl font-bold text-center mb-4"
                style={{ color: 'rgb(var(--color-text))' }}
            >
                {intl.formatMessage({ id: 'education.title' })}
            </h2>

            <p
                className="text-center mb-8 max-w-2xl mx-auto"
                style={{ color: 'rgb(var(--color-text-secondary))' }}
            >
                {intl.formatMessage({ id: 'education.subtitle' })}
            </p>

            {/* Format comparison grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Old Format */}
                <div className="glass-card p-6">
                    <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{
                            background: 'rgb(var(--color-accent) / 0.15)',
                            color: 'rgb(var(--color-accent))'
                        }}
                    >
                        PRE-2016
                    </div>

                    <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: 'rgb(var(--color-text))' }}
                    >
                        {intl.formatMessage({ id: 'education.oldFormat.title' })}
                    </h3>

                    <p
                        className="text-sm mb-4"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                        {intl.formatMessage({ id: 'education.oldFormat.description' })}
                    </p>

                    {/* Structure visualization */}
                    <div
                        className="font-mono text-lg mb-4 p-3 rounded-lg text-center"
                        style={{ background: 'rgb(var(--color-surface))' }}
                    >
                        <span style={{ color: 'rgb(var(--color-info))' }}>YY</span>
                        <span style={{ color: 'rgb(var(--color-success))' }}>DDD</span>
                        <span style={{ color: 'rgb(var(--color-accent))' }}>NNNN</span>
                        <span style={{ color: 'rgb(var(--color-primary))' }}>C</span>
                    </div>

                    <ul className="space-y-2 text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-info))' }}>●</span>
                            {intl.formatMessage({ id: 'education.oldFormat.parts.year' })}
                        </li>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-success))' }}>●</span>
                            {intl.formatMessage({ id: 'education.oldFormat.parts.day' })}
                        </li>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-accent))' }}>●</span>
                            {intl.formatMessage({ id: 'education.oldFormat.parts.serial' })}
                        </li>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-primary))' }}>●</span>
                            {intl.formatMessage({ id: 'education.oldFormat.parts.check' })}
                        </li>
                    </ul>

                    <div
                        className="mt-4 p-3 rounded-lg text-sm font-mono"
                        style={{
                            background: 'rgb(var(--color-primary) / 0.1)',
                            color: 'rgb(var(--color-primary))'
                        }}
                    >
                        {intl.formatMessage({ id: 'education.oldFormat.example' })}
                    </div>
                </div>

                {/* New Format */}
                <div className="glass-card p-6">
                    <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{
                            background: 'rgb(var(--color-success) / 0.15)',
                            color: 'rgb(var(--color-success))'
                        }}
                    >
                        POST-2016
                    </div>

                    <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: 'rgb(var(--color-text))' }}
                    >
                        {intl.formatMessage({ id: 'education.newFormat.title' })}
                    </h3>

                    <p
                        className="text-sm mb-4"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                        {intl.formatMessage({ id: 'education.newFormat.description' })}
                    </p>

                    {/* Structure visualization */}
                    <div
                        className="font-mono text-lg mb-4 p-3 rounded-lg text-center"
                        style={{ background: 'rgb(var(--color-surface))' }}
                    >
                        <span style={{ color: 'rgb(var(--color-info))' }}>YYYY</span>
                        <span style={{ color: 'rgb(var(--color-success))' }}>DDD</span>
                        <span style={{ color: 'rgb(var(--color-accent))' }}>NNNNN</span>
                    </div>

                    <ul className="space-y-2 text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-info))' }}>●</span>
                            {intl.formatMessage({ id: 'education.newFormat.parts.year' })}
                        </li>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-success))' }}>●</span>
                            {intl.formatMessage({ id: 'education.newFormat.parts.day' })}
                        </li>
                        <li className="flex items-start gap-2">
                            <span style={{ color: 'rgb(var(--color-accent))' }}>●</span>
                            {intl.formatMessage({ id: 'education.newFormat.parts.serial' })}
                        </li>
                    </ul>

                    <div
                        className="mt-4 p-3 rounded-lg text-sm font-mono"
                        style={{
                            background: 'rgb(var(--color-primary) / 0.1)',
                            color: 'rgb(var(--color-primary))'
                        }}
                    >
                        {intl.formatMessage({ id: 'education.newFormat.example' })}
                    </div>
                </div>
            </div>

            {/* Gender note */}
            <div
                className="glass-card p-4 text-center"
                style={{
                    background: 'rgb(var(--color-info) / 0.1)',
                    borderColor: 'rgb(var(--color-info) / 0.3)'
                }}
            >
                <p className="text-sm font-medium" style={{ color: 'rgb(var(--color-info))' }}>
                    💡 {intl.formatMessage({ id: 'education.genderNote' })}
                </p>
            </div>
        </section>
    );
}
