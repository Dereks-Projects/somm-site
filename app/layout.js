// app/layout.js

import "./globals.css";
import { Montserrat, Inter } from 'next/font/google';
import MobileNav from '../components/layout/MobileNav';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: "Somm.Site - Free Wine & Hospitality Education",
    template: "%s | Somm.Site"
  },
  description: "Free wine and hospitality education for professionals and enthusiasts. Masters level knowledge, wine service standards, and beverage expertise.",
  keywords: ["wine education", "sommelier training", "hospitality", "wine course", "beverage knowledge", "wine certification"],
  authors: [{ name: "Derek Engles" }],
  creator: "Derek Engles",
  publisher: "Somm.Site",
  // The live address. Must match the primary domain in Vercel (www) and app/sitemap.js.
  metadataBase: new URL("https://www.somm.site"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Somm.Site",
    title: "Somm.Site - Free Wine & Hospitality Education",
    description: "Free wine and hospitality education for professionals and enthusiasts",
    images: [
      {
        url: "/ss-social-card.png",
        width: 1200,
        height: 630,
        alt: "Somm.Site - Wine Education Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Somm.Site - Free Wine & Hospitality Education",
    description: "Free wine and hospitality education for professionals and enthusiasts",
    images: ["/ss-social-card.png"]
  },
  icons: {
    icon: "/ss-favicon.png",
    apple: "/ss-favicon.png"
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    // Entity IDs match the About page and every page's publisher, so Google
    // reads Somm.Site, Derek Engles, and Informative Media as one connected set.
    "@id": "https://somm.site/#organization",
    "name": "Somm.Site",
    "url": "https://www.somm.site",
    "logo": "https://www.somm.site/ss-favicon.png",
    "description": "Free wine and hospitality education for professionals and enthusiasts",
    "sameAs": [
      "https://www.instagram.com/somm.site/",
      "https://tiktok.com/@somm.site",
      "https://www.linkedin.com/company/somm-site/"
    ],
    "founder": {
      "@type": "Person",
      "@id": "https://derekengles.com/#person",
      "name": "Derek Engles"
    },
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://informativemedia.com/#organization",
      "name": "Informative Media"
    }
  };

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body>
        {children}
        {/* Phone-only bottom nav and back-to-top button (hidden at 768px+) */}
        <MobileNav />
        {/* Google Analytics: live site only, never on /studio or local testing */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}