// app/videos/scroll/ScrollFeed.js
// Purpose: The vertical snap-scroll video feed (client). One video per screen,
// full-bleed on mobile and a centered 9:16 column on desktop. Only the active
// video plays; neighbors pause.
//
// Ownership boundary (why this is structured the way it is): React owns a stable
// empty mount <div> per slide and NEVER unmounts it while scrolling. The Vimeo
// SDK owns the <iframe>, which it creates inside that div and destroys through its
// own API. React manages the box, the SDK manages the contents, so the two never
// remove the same DOM node and cannot collide. Only the active slide and its two
// neighbors have a live player, so this stays light at any video count.
//
// Controls: tap the video to pause/play, a corner button toggles sound (persists
// once unmuted), desktop next/previous plus arrow keys, and a Description panel
// (always open beside the video on desktop, tap-to-open sheet on mobile).

'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Player from '@vimeo/player';
import DescriptionPanel from '../../../components/videos/DescriptionPanel';
import styles from './page.module.css';

// Behavior options handed to the SDK when it builds each player.
const PLAYER_OPTIONS = {
  loop: true,
  muted: true,
  controls: false,
  playsinline: true,
  autopause: false,
  dnt: true,
};

export default function ScrollFeed({ videos, initialVideoId }) {
  const router = useRouter();
  const slideRefs = useRef([]);
  const mountRefs = useRef({}); // React-owned mount div, by video id
  const players = useRef({}); // Vimeo Player instance, by video id

  const startIndex = Math.max(
    0,
    videos.findIndex((v) => v.id === String(initialVideoId))
  );

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [descOpen, setDescOpen] = useState(false);

  // ---- helpers ----

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(videos.length - 1, index));
    const slide = slideRefs.current[clamped];
    if (slide) slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    // Apply on this tap so the browser lets sound start (user gesture).
    const activeId = videos[activeIndex]?.id;
    const p = activeId ? players.current[activeId] : null;
    if (p) p.setMuted(next).catch(() => {});
  };

  const togglePause = () => setPaused((prev) => !prev);

  // ---- effects ----

  // Lock background scroll while the feed is open.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Jump to the deep-linked video on first mount, without animation.
  useEffect(() => {
    const slide = slideRefs.current[startIndex];
    if (slide) slide.scrollIntoView({ block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A new active video starts fresh: playing, and any open sheet closed.
  useEffect(() => {
    setPaused(false);
    setDescOpen(false);
  }, [activeIndex]);

  // Track which slide is centered and make it active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: [0.6] }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [videos.length]);

  // Create a player inside the mount div for windowed slides; destroy players
  // that have left the window (SDK removes its own iframe; React leaves the mount
  // div alone). Then apply sound and play/pause state.
  useEffect(() => {
    videos.forEach((v, i) => {
      const inWindow = Math.abs(i - activeIndex) <= 1;
      const mount = mountRefs.current[v.id];
      if (inWindow && mount && !players.current[v.id]) {
        players.current[v.id] = new Player(mount, {
          id: Number(v.id),
          ...PLAYER_OPTIONS,
        });
      }
    });

    Object.keys(players.current).forEach((id) => {
      const i = videos.findIndex((v) => v.id === id);
      if (Math.abs(i - activeIndex) > 1) {
        players.current[id].destroy().catch(() => {});
        delete players.current[id];
      }
    });

    videos.forEach((v, i) => {
      const p = players.current[v.id];
      if (!p) return;
      p.setMuted(muted);
      if (i === activeIndex && !paused && !descOpen) {
        p.play().catch(() => {});
      } else {
        p.pause().catch(() => {});
      }
    });
  }, [activeIndex, muted, paused, descOpen, videos]);

  // Destroy every player on unmount. Safe here: the SDK removes its iframes and
  // React removes the mount divs, but those are different nodes.
  useEffect(() => {
    return () => {
      Object.values(players.current).forEach((p) => p.destroy().catch(() => {}));
      players.current = {};
    };
  }, []);

  // Keyboard navigation (desktop).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, videos.length]);

  return (
    <div className={styles.container}>
      {/* Close */}
      <button
        type="button"
        className={styles.close}
        onClick={() => router.back()}
        aria-label="Close video feed"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Sound toggle */}
      <button
        type="button"
        className={styles.sound}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* Desktop next / previous */}
      <div className={styles.desktopNav}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous video"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next video"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Paused indicator (hidden while the sheet is open) */}
      {paused && !descOpen && (
        <div className={styles.pauseIndicator} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {videos.map((v, i) => (
        <section
          key={v.id}
          data-index={i}
          ref={(el) => (slideRefs.current[i] = el)}
          className={styles.slide}
        >
          <div className={styles.media}>
            {v.thumbnail && (
              <img src={v.thumbnail} alt="" className={styles.poster} />
            )}

            {/* Stable, React-owned mount. The SDK fills this with its iframe. */}
            <div
              ref={(el) => {
                mountRefs.current[v.id] = el;
              }}
              className={styles.player}
            />

            {/* Title / description teaser / hashtags */}
            <div className={styles.overlay}>
              <h2 className={styles.overlayTitle}>{v.title}</h2>
              {v.description && (
                <p className={styles.overlayDesc}>{v.description}</p>
              )}
              {v.hashtags && v.hashtags.length > 0 && (
                <p className={styles.overlayTags}>
                  {v.hashtags.map((t) => `#${t}`).join(' ')}
                </p>
              )}
            </div>

            {/* Active-slide controls */}
            {i === activeIndex && (
              <>
                <button
                  type="button"
                  className={styles.tapLayer}
                  onClick={togglePause}
                  aria-label={paused ? 'Play' : 'Pause'}
                />
                <button
                  type="button"
                  className={styles.descTrigger}
                  onClick={() => setDescOpen(true)}
                  aria-label="Open description"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  Description
                </button>
              </>
            )}
          </div>
        </section>
      ))}

      {/* Description panel: desktop side panel (always open) / mobile sheet */}
      <DescriptionPanel
        video={videos[activeIndex]}
        isOpen={descOpen}
        onClose={() => setDescOpen(false)}
      />
    </div>
  );
}