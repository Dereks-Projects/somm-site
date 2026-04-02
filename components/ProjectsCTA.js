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
            rel="noopener noreferrer"
            className={styles.siteCard}
          >
            <span className={styles.siteName}>Somm.Tips</span>
            <span className={styles.siteDescription}>Wine Pairings & Shopping Insights</span>
          </a>
          <a
            href="https://beverage.fyi"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.siteCard}
          >
            <span className={styles.siteName}>Beverage.fyi</span>
            <span className={styles.siteDescription}>Online Beverage Magazine</span>
          </a>
          <a
            href="https://hospitality.fyi"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.siteCard}
          >
            <span className={styles.siteName}>Hospitality.fyi</span>
            <span className={styles.siteDescription}>Online Hospitality Magazine</span>
          </a>
          <a
            href="https://restaurantstandards.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.siteCard}
          >
            <span className={styles.siteName}>RestaurantStandards.com</span>
            <span className={styles.siteDescription}>Training & Development</span>
          </a>
        </div>

        <div className={styles.parentBrand}>
          <span className={styles.parentLabel}>Presented by</span>
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.parentLink}
          >
            Informative Media
          </a>
        </div>
      </div>
    </section>
  );
}