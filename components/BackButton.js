import styles from './BackButton.module.css';

export default function BackButton({ href, text }) {
  return (
    <div className={styles.backButtonContainer}>
      <a href={href} className={styles.backButton}>
        <span className={styles.arrow}>←</span>
        {text}
      </a>
    </div>
  );
}