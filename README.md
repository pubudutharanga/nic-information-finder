# 🇱🇰 Sri Lankan NIC Information Finder

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://nicinfo.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A free, privacy-first web application to extract **birthday**, **gender**, and **age** from Sri Lankan National Identity Card (NIC) numbers. Works 100% client-side – no data ever leaves your browser.

🌐 **Live Demo**: [https://nicinfo.vercel.app](https://nicinfo.vercel.app)

![NIC Finder Screenshot](public/og-image.png)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎂 **Birthday Extraction** | Decodes birth date from NIC number |
| 👤 **Gender Detection** | Identifies male/female from day-of-year encoding |
| 📅 **Age Calculation** | Precise age in years, months, and days |
| 🌏 **Multi-Language** | English, සිංහල (Sinhala), தமிழ் (Tamil) |
| 🔒 **100% Private** | All processing in-browser, no server requests |
| 📱 **Responsive** | Works on mobile, tablet, and desktop |
| 🌓 **Dark/Light Mode** | Auto-detects system preference |
| 📤 **Social Sharing** | Share via WhatsApp, Facebook, Twitter |
| 📋 **Copy to Clipboard** | One-click copy for results |
| 📆 **Calendar View** | Interactive calendar popup for birthday |

---

## 🆔 NIC Format Support

### Old Format (9 digits + letter)
```
YYDDDNNNNC
Example: 941234567V
```
- `YY` – Last 2 digits of birth year
- `DDD` – Day of year (001-366 male, 501-866 female)
- `NNNN` – Serial number
- `C` – Check character (V or X)

### New Format (12 digits)
```
YYYYDDDNNNNN
Example: 199412345678
```
- `YYYY` – Full 4-digit birth year
- `DDD` – Day of year (001-366 male, 501-866 female)
- `NNNNN` – Serial number

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org) with App Router |
| **UI Library** | [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Animations** | [Framer Motion](https://www.framer.com/motion) |
| **i18n** | [react-intl](https://formatjs.io/docs/react-intl) |
| **UI Components** | [Radix UI](https://www.radix-ui.com) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 📁 Project Structure

```
nic-information-finder/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Locale-based routing
│   │   │   ├── components/        # UI Components
│   │   │   │   ├── NICInput.tsx       # NIC input with validation
│   │   │   │   ├── ResultsDisplay.tsx # Birthday, gender, age display
│   │   │   │   ├── CalendarPopover.tsx# Calendar popup
│   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   ├── FAQSection.tsx
│   │   │   │   ├── HistorySection.tsx
│   │   │   │   └── SocialShare.tsx
│   │   │   ├── layout.tsx         # Root layout with metadata
│   │   │   ├── page.tsx           # Main page
│   │   │   └── json-ld.tsx        # Structured data (10 schemas)
│   │   ├── globals.css            # Global styles
│   │   └── sitemap.ts             # Dynamic sitemap
│   ├── lib/
│   │   ├── nic-utils.ts           # NIC parsing & validation
│   │   ├── i18n.ts                # Internationalization config
│   │   └── theme.ts               # Theme utilities
│   ├── providers/
│   │   ├── ThemeProvider.tsx      # Dark/light mode context
│   │   └── IntlProvider.tsx       # i18n context
│   └── middleware.ts              # Locale detection & routing
├── messages/
│   ├── en.json                    # English translations
│   ├── si.json                    # Sinhala translations
│   └── ta.json                    # Tamil translations
├── public/
│   ├── og-image.png               # Open Graph image
│   ├── manifest.json              # PWA manifest
│   ├── robots.txt                 # Search engine directives
│   └── llms.txt                   # AI crawler info
└── next.config.ts                 # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pubudutharanga/nic-information-finder.git
cd nic-information-finder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Environment Variables

Create a `.env.local` file (optional):

```env
# Base URL for SEO (defaults to nicinfo.vercel.app)
NEXT_PUBLIC_BASE_URL=https://nicinfo.vercel.app
```

---

## 🔐 Privacy & Security

This tool guarantees complete privacy:

- ✅ **100% Client-Side** – All NIC processing happens in your browser
- ✅ **No Server Requests** – NIC data never leaves your device
- ✅ **No Cookies** – No tracking cookies for NIC data
- ✅ **No Analytics on Input** – Google Analytics tracks page views only
- ✅ **Security Headers** – XSS protection, CSP, and more
- ✅ **Open Source** – Fully transparent implementation

---

## 📊 SEO Features

- **10 JSON-LD Schemas**: WebApplication, Organization, FAQPage, HowTo, etc.
- **Dynamic Sitemap**: Auto-generated for all locales
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **robots.txt**: Configured for search engines and AI crawlers
- **Google Analytics**: Integrated (G-FLEV55JTJJ)
- **Structured Data**: 10/10 Rich Results score

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Pubudu Tharanga**

- 🌐 Website: [pubudu-tharanga.vercel.app](https://pubudu-tharanga.vercel.app)
- 📧 Contact: [nicinfo.vercel.app](https://nicinfo.vercel.app)

---

## ⚠️ Disclaimer

This tool is for **informational and educational purposes only**. For official documents and services, please contact the Department for Registration of Persons (DRP) of Sri Lanka at [www.drp.gov.lk](https://www.drp.gov.lk).

---

<p align="center">Made with ❤️ in Sri Lanka 🇱🇰</p>
