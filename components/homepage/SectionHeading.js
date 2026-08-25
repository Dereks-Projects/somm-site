// components/homepage/SectionHeading.js
// Purpose: Reusable homepage section label ("Latest Articles", "Latest Videos").
// Bold Inter title over a short, centered medium-gray rule. Kept small on mobile
// and scaled up on desktop so it stays unobtrusive.

import styles from './SectionHeading.module.css';

export default function SectionHeading({ title }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rule} />
    </div>
  );
}