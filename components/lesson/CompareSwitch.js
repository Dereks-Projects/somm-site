// components/lesson/CompareSwitch.js
// "Side by side" block: two or more grape cards next to each other. A card
// with variants (for example two regions) gets a switch; a card can also show
// a range bar (for example bone-dry to sweet). All content comes from the
// lesson JSON (see lib/lessonBlocks.js).

'use client';

import { useId, useState } from 'react';
import LessonStation from './LessonStation';
import ChoiceGroup from './ChoiceGroup';
import NoteChips from './NoteChips';
import styles from './CompareSwitch.module.css';

export default function CompareSwitch({ compare }) {
  const groupId = useId();
  const [variantIndexes, setVariantIndexes] = useState(() => compare.cards.map(() => 0));

  return (
    <LessonStation id="compare" eyebrow={compare.eyebrow} title={compare.title} intro={compare.intro}>
      <div className={styles.cards}>
        {compare.cards.map((card, cardIndex) => {
          const variant = card.variants.length > 0 ? card.variants[variantIndexes[cardIndex]] : null;
          const headline = variant ? variant.headline : card.headline;
          const notes = variant ? variant.notes : card.notes;

          return (
            <article key={`${card.name}-${cardIndex}`} className={styles.card}>
              <h4 className={styles.cardName}>{card.name}</h4>

              {card.variants.length > 0 && (
                <ChoiceGroup
                  name={`${groupId}-card-${cardIndex}`}
                  legend={`${card.name}: ${card.switchLabel}`}
                  hideLegend
                  options={card.variants.map((item, index) => ({ value: String(index), label: item.label }))}
                  value={String(variantIndexes[cardIndex])}
                  onChange={(value) =>
                    setVariantIndexes((current) =>
                      current.map((index, position) => (position === cardIndex ? Number(value) : index))
                    )
                  }
                />
              )}

              {card.range && (
                <div className={styles.range}>
                  <span className={styles.rangeBar} aria-hidden="true" />
                  <p className={styles.rangeEnds}>
                    <span>{card.range.from}</span>
                    <span className={styles.srOnly}> to </span>
                    <span>{card.range.to}</span>
                  </p>
                </div>
              )}

              <div className={styles.details} aria-live="polite">
                {headline && <p className={styles.headline}>{headline}</p>}
                <NoteChips notes={notes} />
              </div>

              {card.footnote && <p className={styles.footnote}>{card.footnote}</p>}
            </article>
          );
        })}
      </div>
    </LessonStation>
  );
}