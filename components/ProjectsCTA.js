import styles from './ProjectsCTA.module.css';

export default function ProjectsCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaHeading}>Looking For More?</h2>
        <p className={styles.ctaDescription}>
          Visit one of our partner sites for more ways to learn.
        </p>
        
        <div className={styles.buttonGroup}>
          
          <a 
            href="https://somm.tips" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Somm.Tips
          </a>
          <a 
            href="https://beverage.fyi" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Beverage.fyi
          </a>
          <a 
            href="https://hospitality.fyi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Hospitality.fyi
          </a>
          <a 
            href="https://backbar.fyi" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Backbar.fyi
          </a>
        </div>
      </div>
    </section>
  );
}