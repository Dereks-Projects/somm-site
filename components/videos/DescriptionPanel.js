// components/videos/DescriptionPanel.js
// Purpose: The active video's full Description. One responsive component, two
// presentations. Mobile: a slide-up sheet, opened on demand, closed by the X or
// the backdrop. Desktop (>=1100px): an always-open panel in the empty space
// beside the video. Driven by whichever video is active in the feed.
//
// Hashtags link into the Article Collection, the same behavior as the video page.

import Link from 'next/link';
import styles from './DescriptionPanel.module.css';

export default function DescriptionPanel({ video, isOpen, onClose }) {
  if (!video) return null;

  return (
    <>
      {/* Mobile backdrop; hidden on desktop. */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-label="Video description"
      >
        {/* Mobile close; hidden on desktop. */}
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close description"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{video.title}</h2>
          {video.description && (
            <p className={styles.description}>{video.description}</p>
          )}
          {video.hashtags && video.hashtags.length > 0 && (
            <div className={styles.tags}>
              {video.hashtags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className={styles.tagLink}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}