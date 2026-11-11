// components/FeatureVideo.js
// Click-to-play 16:9 video for lessons, articles, and the homepage. Server-side
// this is only the thumbnail and a play button, so pages stay light; the Vimeo
// player loads when the visitor taps play, then plays with sound since the tap
// is a real user gesture. Props come from getFeatureVideo() in lib/vimeo.js.

'use client';

import { useState } from 'react';
import styles from './FeatureVideo.module.css';

// 168 -> "2:48", 3725 -> "1:02:05"
function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = String(s % 60).padStart(2, '0');
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`
    : `${minutes}:${seconds}`;
}

export default function FeatureVideo({ id, title, thumbnail, duration }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&playsinline=1&dnt=1&title=0&byline=0&portrait=0&color=ffde59`}
          className={styles.iframe}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      ) : (
        <button
          type="button"
          className={styles.facade}
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
        >
          {thumbnail && (
            <img
              src={thumbnail}
              alt=""
              className={styles.thumbnail}
              loading="lazy"
              decoding="async"
            />
          )}
          <span className={styles.playButton} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" focusable="false">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {duration > 0 && (
            <span className={styles.duration} aria-hidden="true">
              {formatDuration(duration)}
            </span>
          )}
        </button>
      )}
    </div>
  );
}