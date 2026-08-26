// components/shared/ScrollToTop.js
// Purpose: A floating "back to top" button for long pages (articles, study
// guides). Mobile only, bottom-left, fades in once the reader has scrolled down,
// smooth-scrolls to the top on tap. Placed directly in the two templates that
// need it, so it never appears anywhere else.

'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll(); // set initial state on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={toTop}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}