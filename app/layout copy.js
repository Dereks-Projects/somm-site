import "./globals.css";
import Script from 'next/script';

export const metadata = {
  title: {
    default: "Somm.Site - Wine & Hospitality Education",
    template: "%s | Somm.Site"
  },
  description: "Wine and hospitality education for professionals and enthusiasts. Expert sommelier knowledge, wine service standards, and beverage expertise.",
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
    title: "Somm.Site - Wine & Hospitality Education",
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
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SXECWJWCP5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SXECWJWCP5');
          `}
        </Script>
        
        {children}
      </body>
    </html>
  );
}