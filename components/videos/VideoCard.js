// components/videos/VideoCard.js
// Purpose: One reusable 9:16 video thumbnail card. Image only (the title is
// burned into the Vimeo first-frame thumbnail). Takes an href prop so the same
// card serves both the homepage rail and the /videos grid. Plain <img> with a
// locked aspect ratio, so there is no layout shift as thumbnails load.

import Link from 'next/link';
import styles from './VideoCardStyles.module.css';

export default function VideoCard({ video, href }) {
  if (!video) return null;

  return (
    <Link href={href} className={styles.card} aria-label={video.title}>
      <div className={styles.thumbWrapper}>
        {video.thumbnail && (
          <img
            src={video.thumbnail}
            alt={video.title}
            width={video.thumbnailWidth}
            height={video.thumbnailHeight}
            loading="lazy"
            className={styles.thumb}
          />
        )}
      </div>
    </Link>
  );
}