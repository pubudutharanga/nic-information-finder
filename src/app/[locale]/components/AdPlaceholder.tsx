'use client';

import { useIntl } from 'react-intl';

interface AdPlaceholderProps {
    size: '728x90' | '300x250' | '320x50';
    position: 'header-banner' | 'in-content-rectangle' | 'mobile-sticky-bottom';
    className?: string;
}

export default function AdPlaceholder({ size, position, className = '' }: AdPlaceholderProps) {
    const intl = useIntl();

    const dimensions = {
        '728x90': { width: 728, height: 90 },
        '300x250': { width: 300, height: 250 },
        '320x50': { width: 320, height: 50 },
    }[size];

    const positionClasses = {
        'header-banner': 'hidden md:flex justify-center my-4',
        'in-content-rectangle': 'flex justify-center my-8',
        'mobile-sticky-bottom': 'md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-center',
    }[position];

    return (
        <div className={`${positionClasses} ${className} no-print`}>
            <div
                className="flex flex-col items-center justify-center rounded-lg"
                style={{
                    width: position === 'mobile-sticky-bottom' ? '100%' : dimensions.width,
                    height: dimensions.height,
                    maxWidth: '100%',
                    background: 'rgb(var(--color-surface))',
                    border: '1px dashed rgb(var(--color-border))',
                }}
            >
                <p className="text-xs mb-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                    {intl.formatMessage({ id: 'ad.label' })}
                </p>
                <div className="text-sm opacity-50" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                    {size}
                </div>
            </div>
        </div>
    );
}
