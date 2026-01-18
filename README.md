# Sri Lankan NIC Information Finder 🇱🇰

A production-grade Next.js 14+ Single Page Application that extracts Birthday, Gender, and Age from Sri Lankan National Identity Card (NIC) numbers. Built with SEO dominance and AI discoverability as primary goals.

![NIC Finder](./public/og-image.png)

## ✨ Features

- **NIC Decoding**: Extract birthday, gender, and age from both old (9-digit) and new (12-digit) NIC formats
- **Multi-language**: Full support for English, Sinhala (සිංහල), and Tamil (தமிழ்)
- **Privacy-First**: 100% client-side processing - no data ever leaves your device
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive**: Mobile-first design with premium UX
- **SEO Optimized**: 7 JSON-LD schemas, Open Graph, Twitter Cards, hreflang
- **AI Discoverable**: llms.txt, ai-plugin.json for chatbot citations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Dynamic locale routing
│   │   ├── components/     # UI components
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Main page
│   │   └── json-ld.tsx     # Structured data schemas
│   ├── globals.css         # Theme & styles
│   └── sitemap.ts          # Dynamic sitemap
├── lib/
│   ├── i18n.ts            # i18n configuration
│   ├── nic-utils.ts       # NIC parsing logic
│   └── theme.ts           # Theme configuration
├── providers/
│   ├── IntlProvider.tsx   # FormatJS wrapper
│   └── ThemeProvider.tsx  # Dark mode context
└── middleware.ts          # Locale detection/redirect
messages/
├── en.json                # English translations
├── si.json                # Sinhala translations
└── ta.json                # Tamil translations
public/
├── robots.txt             # Crawler rules
├── llms.txt               # AI assistant info
├── manifest.json          # PWA manifest
└── .well-known/
    └── ai-plugin.json     # ChatGPT plugin manifest
```

## 🔧 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.3 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 11.x | Animations |
| Radix UI | Latest | Accessible primitives |
| react-intl | 6.x | Internationalization |

## 🌐 SEO Features

### Structured Data (JSON-LD)
- WebApplication
- Organization
- WebSite with SearchAction
- FAQPage (10+ questions)
- HowTo
- BreadcrumbList
- SoftwareApplication

### Meta Tags
- Dynamic titles per locale
- Open Graph suite
- Twitter Cards
- hreflang alternates

### AI Discoverability
- `/llms.txt` - Machine-readable site info
- `/.well-known/ai-plugin.json` - ChatGPT plugin manifest
- robots.txt with explicit AI crawler permissions

## 📱 NIC Format Reference

### Old Format (Pre-2016)
```
941234567V
│││      │
││└──────┴── Serial (4 digits) + Check letter (V/X)
│└────────── Day of year (1-366 male, 501-866 female)
└─────────── Birth year (2 digits)
```

### New Format (Post-2016)
```
199412345678
││││       │
│││└───────┴── Serial number (5 digits)
││└──────────── Day of year (1-366 male, 501-866 female)
└┴───────────── Birth year (4 digits)
```

## 🔒 Privacy

All NIC processing happens entirely in your browser:
- ✅ No server requests
- ✅ No data storage
- ✅ No cookies for NIC data
- ✅ No tracking or analytics on NIC data

## 🌍 Localization

| Locale | Language | Status |
|--------|----------|--------|
| en | English | ✅ Complete |
| si | සිංහල (Sinhala) | ✅ Complete |
| ta | தமிழ் (Tamil) | ✅ Complete |

## 📄 Environment Variables

Create `.env.local`:

```env
# Base URL for canonical URLs and Open Graph
NEXT_PUBLIC_BASE_URL=https://nic.lk

# Google verification (optional)
GOOGLE_SITE_VERIFICATION=your-code-here
```

## 🧪 Testing

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build verification
npm run build
```

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 100 |
| LCP | < 1.5s |
| CLS | 0 |
| INP | < 50ms |

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Sri Lankan Department for Registration of Persons (DRP)
- The people of Sri Lanka 🇱🇰

---

Made with ❤️ for Sri Lanka
