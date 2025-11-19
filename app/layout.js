import "./globals.css";

export const metadata = {
  title: {
    default: "SOMM.SITE - Free Wine & Hospitality Education",
    template: "%s | SOMM.SITE"
  },
  description: "Free wine and hospitality education for professionals and enthusiasts. Master sommelier knowledge, wine service standards, and beverage expertise.",
  keywords: ["wine education", "sommelier training", "hospitality", "wine course", "beverage knowledge", "wine certification"],
  authors: [{ name: "Derek Engles" }],
  creator: "Derek Engles",
  publisher: "SOMM.SITE",
  metadataBase: new URL("https://somm.site"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://somm.site",
    siteName: "SOMM.SITE",
    title: "SOMM.SITE - Free Wine & Hospitality Education",
    description: "Free wine and hospitality education for professionals and enthusiasts",
    images: [
      {
        url: "/ss-social-card.png",
        width: 1200,
        height: 630,
        alt: "SOMM.SITE - Wine Education Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMM.SITE - Free Wine & Hospitality Education",
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
    "name": "SOMM.SITE",
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
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SXECWJWCP5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SXECWJWCP5');
            `,
          }}
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}