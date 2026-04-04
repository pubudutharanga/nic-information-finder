'use client';

import { useEffect, useRef, useState } from 'react';

interface AdsterraNativeBannerProps {
    className?: string;
}

/**
 * Adsterra Native Banner ad component.
 * Renders the container div and dynamically loads the async invoke script.
 */
export default function AdsterraNativeBanner({ className = '' }: AdsterraNativeBannerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://pl29051267.profitablecpmratenetwork.com/4c6815abaf72e4014d86995aeaf7209f/invoke.js';
        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                // Re-add the container div after cleanup
            }
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className={`adsterra-native-banner ${className}`} aria-hidden="true">
            <div id="container-4c6815abaf72e4014d86995aeaf7209f"></div>
        </div>
    );
}
