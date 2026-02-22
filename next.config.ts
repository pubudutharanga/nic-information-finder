import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slash for consistent URLs
  trailingSlash: false,

  // Compression
  compress: true,

  // Security and caching headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // 2026 SEO: HSTS for security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // 2026 SEO: Preconnect hints for performance
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://www.googletagmanager.com>; rel=dns-prefetch',
          },
        ],
      },
      // Cache static assets
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache JS/CSS
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

};

export default nextConfig;
