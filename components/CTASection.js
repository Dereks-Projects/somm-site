import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Let's Collaborate</h2>
        <p className={styles.subheading}>From educational pieces to technology products, we execute at the highest level.</p>
        <div className={styles.buttons}>
          <a href="/contact" className={styles.primaryButton}>Contact</a>
          <a href="/about" className={styles.secondaryButton}>About</a>
        </div>
      </div>
    </section>
  );
}