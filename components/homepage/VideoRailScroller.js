// components/homepage/VideoRailScroller.js
// Purpose: Client scroll shell for the video rail. Cards are plain links that
// open on click; horizontal movement comes from arrow buttons on the ends (plus
// native trackpad / shift-scroll). No drag, so there is no click-vs-drag conflict
// to freeze. Arrows fade out when there is nothing more to scroll that way, and
// are desktop-only (mobile keeps native swipe). Cards arrive as server-rendered
// children, so only this small shell ships JavaScript to the homepage.

'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoRail.module.css';

export default function VideoRailScroller({ children }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanLeft(track.scrollLeft > 1);
    setCanRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      track.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByDir = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={styles.viewport}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft} ${canLeft ? '' : styles.arrowHidden}`}
        onClick={() => scrollByDir(-1)}
        aria-label="Scroll left"
        tabIndex={canLeft ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className={styles.track} ref={trackRef}>
        {children}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight} ${canRight ? '' : styles.arrowHidden}`}
        onClick={() => scrollByDir(1)}
        aria-label="Scroll right"
        tabIndex={canRight ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}