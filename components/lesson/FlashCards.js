// components/lesson/FlashCards.js
// "Flash cards" block: the reader picks a grape and sees one card for it,
// with a short description, tasting notes, and a body rating out of 5.
// All content comes from the lesson JSON (see lib/lessonBlocks.js).

'use client';

import { useId, useState } from 'react';
import LessonStation from './LessonStation';
import ChoiceGroup from './ChoiceGroup';
import NoteChips from './NoteChips';
import styles from './FlashCards.module.css';

const BODY_STEPS = [1, 2, 3, 4, 5];

export default function FlashCards({ flash }) {
  const groupId = useId();
  const [cardIndex, setCardIndex] = useState(0);
  const card = flash.cards[cardIndex];

  return (
    <LessonStation id="flash-cards" eyebrow={flash.eyebrow} title={flash.title} intro={flash.intro}>
      <div className={styles.wrap}>
        {flash.cards.length > 1 && (
          <ChoiceGroup
            name={`${groupId}-card`}
            legend={flash.chooseLabel}
            hideLegend
            options={flash.cards.map((item, index) => ({ value: String(index), label: item.name }))}
            value={String(cardIndex)}
            onChange={(value) => setCardIndex(Number(value))}
          />
        )}

        <div className={styles.card} aria-live="polite">
          <div className={styles.main}>
            {card.tag && <p className={styles.tag}>{card.tag}</p>}
            <p className={styles.name}>{card.name}</p>
            {card.text && <p className={styles.text}>{card.text}</p>}
            <NoteChips notes={card.notes} />
          </div>

          {card.body && (
            <div className={styles.body}>
              <p className={styles.bodyHeading}>Body</p>
              <div className={styles.meter} role="img" aria-label={`Body: ${card.body} of 5`}>
                {BODY_STEPS.map((step) => (
                  <span
                    key={step}
                    className={step <= card.body ? `${styles.step} ${styles.stepOn}` : styles.step}
                  />
                ))}
              </div>
              {card.bodyLabel && <p className={styles.bodyLabel}>{card.bodyLabel}</p>}
            </div>
          )}
        </div>
      </div>
    </LessonStation>
  );
}