// components/lesson/NoteChips.js
// A short list of tasting notes shown as outlined chips. Renders nothing when
// there are no notes.

import styles from './NoteChips.module.css';

export default function NoteChips({ notes, label = 'Tasting notes' }) {
  if (!Array.isArray(notes) || notes.length === 0) return null;

  return (
    <ul className={styles.chips} aria-label={label}>
      {notes.map((note) => (
        <li key={note} className={styles.chip}>
          {note}
        </li>
      ))}
    </ul>
  );
}