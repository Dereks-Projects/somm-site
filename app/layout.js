import "./globals.css";
import Script from 'next/script';
import { Montserrat, Inter } from 'next/font/google';

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
  metadataBase: new URL("https://somm.site"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://somm.site",
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
    "name": "Somm.Site",
    "url": "https://somm.site",
    "logo": "https://somm.site/ss-favicon.png",
    "description": "Free wine and hospitality education for professionals and enthusiasts",
    "sameAs": [
      "https://www.instagram.com/somm.site/",
      "https://tiktok.com/@somm.site",
      "https://www.linkedin.com/company/somm-site/"
    ],
    "founder": {
      "@type": "Person",
      "name": "Derek Engles"
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
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JCX7CLCX4B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JCX7CLCX4B');
          `}
        </Script>
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}