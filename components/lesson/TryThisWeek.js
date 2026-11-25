// components/lesson/TryThisWeek.js
// "Take it to the glass" box shown inside the takeaway band: a short list of
// ideas to taste or try this week. Server component: plain HTML with no
// browser JavaScript. All content comes from the lesson JSON
// (see lib/lessonBlocks.js).

import styles from './TryThisWeek.module.css';

export default function TryThisWeek({ tasks }) {
  return (
    <section className={styles.box} aria-labelledby="try-this-week-title">
      <p className={styles.eyebrow}>{tasks.eyebrow}</p>
      <h3 id="try-this-week-title" className={styles.title}>
        {tasks.title}
      </h3>

      <ul className={styles.list}>
        {tasks.items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}