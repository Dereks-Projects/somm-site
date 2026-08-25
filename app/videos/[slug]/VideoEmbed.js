// app/videos/[slug]/VideoEmbed.js
// Purpose: Click-to-load player facade. Server-side this is just the thumbnail
// and a play button, so the page stays light and fast (good for LCP). The Vimeo
// iframe mounts only when the visitor clicks, and plays with sound and controls
// since the click is a real user gesture.

'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function VideoEmbed({ id, title, thumbnail, thumbnailWidth, thumbnailHeight }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.playerWrap}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&controls=1&playsinline=1&dnt=1`}
          className={styles.playerIframe}
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.facade}
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          width={thumbnailWidth}
          height={thumbnailHeight}
          className={styles.facadeImage}
          loading="eager"
        />
      )}
      <span className={styles.playButton} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}