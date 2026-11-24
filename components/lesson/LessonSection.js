// components/lesson/LessonSection.js
// One numbered lesson section: the large numeral with the yellow bar, the
// section heading, and the section text split into readable paragraphs.
// Optional `media` (the lesson's body image) is placed after the middle
// paragraph. Server component: renders plain HTML with no browser JavaScript.

import { Fragment } from 'react';
import { splitParagraphs } from '../../lib/splitParagraphs';
import styles from './LessonSection.module.css';

export default function LessonSection({ id, number, title, text, media = null }) {
  const paragraphs = splitParagraphs(text);

  if (!title && paragraphs.length === 0) return null;

  const headingId = `${id}-title`;
  const numeral = String(number).padStart(2, '0');
  // After the first of two paragraphs, the second of three, and so on.
  const mediaAfter = media ? Math.max(1, Math.ceil(paragraphs.length / 2)) : 0;

  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className={styles.inner}>
        <div className={styles.marker} aria-hidden="true">
          <span className={styles.numeral}>{numeral}</span>
          <span className={styles.bar} />
        </div>

        <div className={styles.body}>
          {title && (
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          )}

          {paragraphs.map((paragraph, index) => (
            <Fragment key={index}>
              <p className={styles.text}>{paragraph}</p>
              {index + 1 === mediaAfter && <div className={styles.media}>{media}</div>}
            </Fragment>
          ))}

          {paragraphs.length === 0 && media && <div className={styles.media}>{media}</div>}
        </div>
      </div>
    </section>
  );
}