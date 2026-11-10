// components/ProjectsCTA.js
// Cross-marketing CTA for Somm.Tips and RestaurantStandards.com, with a small
// Informative Media credit. Links keep the referrer so the destination sites'
// analytics can see the traffic came from Somm.Site.

import styles from './ProjectsCTA.module.css';

export default function ProjectsCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <p className={styles.ctaLabel}>OUR PORTFOLIO</p>
        <h2 className={styles.ctaHeading}>Built for Hospitality</h2>

        <div className={styles.siteGrid}>
          <a
            href="https://somm.tips"
            target="_blank"
            rel="noopener"
            className={styles.siteCard}
          >
            <span className={styles.siteName}>Somm.Tips</span>
            <span className={styles.siteDescription}>Wine Recommendations</span>
          </a>
          <a
            href="https://restaurantstandards.com"
            target="_blank"
            rel="noopener"
            className={styles.siteCard}
          >
            <span className={styles.siteName}>RestaurantStandards.com</span>
            <span className={styles.siteDescription}>Restaurant Training & Development</span>
          </a>
        </div>

        <div className={styles.parentBrand}>
          <span className={styles.parentLabel}>Presented by</span>
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener"
            className={styles.parentLink}
          >
            Informative Media
          </a>
        </div>
      </div>
    </section>
  );
}