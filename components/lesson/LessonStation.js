// components/lesson/LessonStation.js
// The full-width band that frames every interactive block: a label column
// (eyebrow, heading, short intro, and optional extra content such as a score)
// beside the block itself. Has no state, so it works inside server and
// client components alike.

import styles from './LessonStation.module.css';

const TONES = { dark: styles.dark, black: styles.black, light: styles.light };

export default function LessonStation({ id, tone = 'dark', eyebrow, title, intro, aside = null, children }) {
  const titleId = `${id}-title`;

  return (
    <section id={id} className={`${styles.station} ${TONES[tone] || TONES.dark}`} aria-labelledby={titleId}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          {intro && <p className={styles.intro}>{intro}</p>}
          {aside}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}