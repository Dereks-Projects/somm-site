// components/lesson/Scenario.js
// "Your call" block: a guest situation with a few possible answers. After the
// reader picks one, the best call is marked and feedback explains why.
// All content comes from the lesson JSON (see lib/lessonBlocks.js).

'use client';

import { useState } from 'react';
import LessonStation from './LessonStation';
import styles from './Scenario.module.css';

function getChoiceState(choice, index, pickedIndex) {
  if (pickedIndex === null) return 'open';
  if (choice.correct) return 'best';
  return index === pickedIndex ? 'picked' : 'other';
}

const TAGS = { best: 'Best call', picked: 'Your pick' };

export default function Scenario({ scenario }) {
  const [pickedIndex, setPickedIndex] = useState(null);
  const answered = pickedIndex !== null;
  const picked = answered ? scenario.choices[pickedIndex] : null;

  return (
    <LessonStation
      id="your-call"
      tone="black"
      eyebrow={scenario.eyebrow}
      title={scenario.title}
      intro={scenario.intro}
    >
      <div className={styles.wrap}>
        <p className={styles.prompt}>{scenario.prompt}</p>

        <ul className={styles.choices}>
          {scenario.choices.map((choice, index) => {
            const state = getChoiceState(choice, index, pickedIndex);

            return (
              <li key={index}>
                <button
                  type="button"
                  className={styles.choice}
                  data-state={state}
                  aria-disabled={answered}
                  onClick={() => {
                    if (!answered) setPickedIndex(index);
                  }}
                >
                  <span>{choice.text}</span>
                  {TAGS[state] && <span className={styles.tag}>{TAGS[state]}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        <div className={styles.feedback} aria-live="polite">
          {picked && (
            <>
              <p className={styles.verdict}>{picked.correct ? 'Good call.' : 'Not quite.'}</p>
              <p className={styles.feedbackText}>{picked.feedback}</p>
            </>
          )}
        </div>
      </div>
    </LessonStation>
  );
}