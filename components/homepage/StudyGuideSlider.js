import Link from 'next/link';
import { urlFor } from '../../sanity/lib/imageUrl';
import styles from './StudyGuideSlider.module.css';

export default function StudyGuideSlider({ guides }) {
  if (!guides || guides.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Regional Reports">
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.label}>Regional Reports</p>
          <h2 className={styles.heading}>
            Explore the important wine regions from around the globe.
          </h2>
        </div>
        <Link href="/study-guides" className={styles.browseButtonDesktop}>
          Browse Guides
        </Link>
      </div>

      {/* Scrollable Card Row */}
      <div className={styles.scrollContainer}>
        <div className={styles.cardRow}>
          {guides.map((guide) => {
            const imageUrl = guide.mainImage
              ? urlFor(guide.mainImage).width(600).height(338).format('webp').quality(80).url()
              : null;

            return (
              <Link
                key={guide._id}
                href={`/study-guides/${guide.slug.current}`}
                className={styles.card}
              >
                {/* Card Image */}
                <div className={styles.cardImageWrapper}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={guide.mainImage?.alt || guide.title}
                      className={styles.cardImage}
                      loading="lazy"
                      width={600}
                      height={338}
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder} />
                  )}
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{guide.title}</h3>
                  {guide.subtitle && (
                    <p className={styles.cardSubtitle}>{guide.subtitle}</p>
                  )}
                  <span className={styles.cardLink}>Read Guide</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Browse Button - Mobile Only (below cards) */}
      <div className={styles.browseButtonMobileWrapper}>
        <Link href="/study-guides" className={styles.browseButtonMobile}>
          Browse Guides
        </Link>
      </div>
    </section>
  );
}