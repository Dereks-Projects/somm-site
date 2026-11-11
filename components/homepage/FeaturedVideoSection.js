// components/homepage/FeaturedVideoSection.js
// Homepage "Featured Video" in a magazine-spread layout. Desktop: video on the
// left; label, headline, summary, and button on the right. Phones and tablets:
// stacked, with the headline above the video and the button centered.
// Headline, summary, and button are set in data/featuredVideo.json; if the
// headline is blank, the video's Vimeo title is used instead.

import Link from 'next/link';
import FeatureVideo from '../FeatureVideo';
import styles from './FeaturedVideoSection.module.css';

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

export default function FeaturedVideoSection({ video, headline, summary, link, linkLabel }) {
  const title = clean(headline) || video.title;
  const text = clean(summary);
  const href = clean(link);

  return (
    <section className={styles.section} aria-labelledby="featured-video-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowBar} aria-hidden="true" />
          Featured Video
        </p>

        <h2 id="featured-video-heading" className={styles.headline}>
          {title}
        </h2>

        <div className={styles.media}>
          <FeatureVideo
            id={video.id}
            title={title}
            thumbnail={video.thumbnail}
            duration={video.duration}
          />
        </div>

        {text && <p className={styles.summary}>{text}</p>}

        {href && (
          <div className={styles.action}>
            <Link href={href} className={styles.button}>
              {clean(linkLabel) || 'Learn more'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}