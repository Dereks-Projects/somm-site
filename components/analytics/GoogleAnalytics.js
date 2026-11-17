// components/analytics/GoogleAnalytics.js
// Loads Google Analytics on the live site only. It is skipped on /studio
// (Sanity Studio sessions were inflating "Direct" traffic) and on any address
// that is not the live site (localhost, Vercel previews), so testing never
// counts as a visit.

'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_ID = 'G-JCX7CLCX4B';
const LIVE_HOSTS = ['www.somm.site', 'somm.site'];

// Reads the browser's address without a hydration mismatch: the server render
// treats it as "not live", then React re-renders with the real value.
const subscribe = () => () => {};
const getIsLiveSite = () => LIVE_HOSTS.includes(window.location.hostname);
const getServerSnapshot = () => false;

export default function GoogleAnalytics() {
  const pathname = usePathname() || '';
  const isLiveSite = useSyncExternalStore(subscribe, getIsLiveSite, getServerSnapshot);
  const isStudio = pathname === '/studio' || pathname.startsWith('/studio/');

  if (!isLiveSite || isStudio) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
