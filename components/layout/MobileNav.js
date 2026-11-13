// components/layout/MobileNav.js
// App-style bottom navigation for phones (hidden at 768px and wider). Five
// tabs; the current section's tab is lit. Tapping the lit tab on a section's
// main page scrolls to the top; on a page inside the section (an article, a
// lesson) it returns to that section's main page. Also renders the site-wide
// floating back-to-top button and a spacer so the bar never covers the footer.
// Mounted once in app/layout.js. Hidden on the full-screen video feed and in
// Sanity Studio.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollToTop from '../shared/ScrollToTop';
import styles from './MobileNav.module.css';

const HIDDEN_ON = ['/studio', '/videos/scroll'];

const TABS = [
  {
    href: '/',
    label: 'Home',
    icon: <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    href: '/articles',
    label: 'Articles',
    icon: (
      <>
        <path d="M4 21h15a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-8h4" />
        <path d="M10 7h7" />
        <path d="M10 11h7" />
        <path d="M10 15h5" />
      </>
    ),
  },
  {
    href: '/study-guides',
    label: 'Guides',
    icon: (
      <>
        <path d="M3 6.5l6-3 6 3 6-3v14l-6 3-6-3-6 3z" />
        <path d="M9 3.5v14" />
        <path d="M15 6.5v14" />
      </>
    ),
  },
  {
    href: '/courses',
    label: 'Courses',
    icon: (
      <>
        <path d="M2 9.5L12 5l10 4.5L12 14z" />
        <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
        <path d="M22 9.5V15" />
      </>
    ),
  },
  {
    href: '/videos',
    label: 'Videos',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5v7l6-3.5z" />
      </>
    ),
  },
];

// Home is lit only on "/"; every other tab is lit for its whole section.
function isInSection(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileNav() {
  const pathname = usePathname() || '/';

  if (HIDDEN_ON.some((path) => isInSection(pathname, path))) return null;

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <ScrollToTop />

      <nav className={styles.nav} aria-label="Main">
        {TABS.map((tab) => {
          const active = isInSection(pathname, tab.href);
          const onMainPage = pathname === tab.href;

          const handleClick = (event) => {
            if (onMainPage) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          };

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={handleClick}
              className={active ? `${styles.tab} ${styles.active}` : styles.tab}
              aria-current={onMainPage ? 'page' : active ? 'true' : undefined}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {tab.icon}
              </svg>
              <span className={styles.label}>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}