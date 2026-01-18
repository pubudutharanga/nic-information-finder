'use client';

import { useIntl } from 'react-intl';

export default function FAQSection() {
    const intl = useIntl();

    const faqs = Array.from({ length: 10 }, (_, i) => ({
        question: intl.formatMessage({ id: `faq.questions.${i}.question` }),
        answer: intl.formatMessage({ id: `faq.questions.${i}.answer` }),
    }));

    return (
        <section className="w-full max-w-4xl mx-auto" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: 'rgb(var(--color-text))' }}>
                {intl.formatMessage({ id: 'faq.title' })}
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <details key={index} className="glass-card group">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold" style={{ color: 'rgb(var(--color-text))' }}>
                            <h3 className="text-left pr-4">{faq.question}</h3>
                            <svg className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <div className="px-5 pb-5 pt-0" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                            <p className="leading-relaxed">{faq.answer}</p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
