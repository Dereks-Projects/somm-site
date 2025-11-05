import styles from './SplitSection.module.css';

export default function SplitSection() {
  return (
    <section className={styles.splitSection}>
      <div className={styles.leftSide}>
        <h2 className={styles.leftTitle}>Beverage Education is Spread Out Across The Web!</h2>
      </div>
      <div className={styles.rightSide}>
        <h2 className={styles.rightTitle}>Everything You Need to Master this Topic is Listed Below.</h2>
      </div>
    </section>
  );
}