'use client';

import { useEffect, useRef, useState } from 'react';

interface AdsterraAdProps {
    adKey: string;
    width: number;
    height: number;
    className?: string;
}

/**
 * Reusable Adsterra iframe ad component.
 * Dynamically injects the atOptions + invoke script into the DOM
 * since Next.js won't execute inline <script> tags in JSX.
 */
export default function AdsterraAd({ adKey, width, height, className = '' }: AdsterraAdProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        const container = containerRef.current;

        // Inject atOptions
        const optionsScript = document.createElement('script');
        optionsScript.type = 'text/javascript';
        optionsScript.text = `
            atOptions = {
                'key' : '${adKey}',
                'format' : 'iframe',
                'height' : ${height},
                'width' : ${width},
                'params' : {}
            };
        `;
        container.appendChild(optionsScript);

        // Inject invoke script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
        container.appendChild(invokeScript);

        return () => {
            // Cleanup on unmount
            container.innerHTML = '';
        };
    }, [mounted, adKey, width, height]);

    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            className={`adsterra-ad flex justify-center items-center overflow-hidden ${className}`}
            style={{ minHeight: height, maxWidth: '100%' }}
            aria-hidden="true"
        />
    );
}
