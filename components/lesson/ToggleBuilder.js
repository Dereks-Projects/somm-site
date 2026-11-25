// components/lesson/ToggleBuilder.js
// "Build a Chardonnay" style block: the reader flips winemaking choices and
// the glass, style name, tasting notes, and texture line update to match.
// An optional footnote sits under the result (for example, to flag a
// simplification).
// Everything shown comes from the lesson JSON (see lib/lessonBlocks.js).

'use client';

import { useId, useState } from 'react';
import LessonStation from './LessonStation';
import ChoiceGroup from './ChoiceGroup';
import NoteChips from './NoteChips';
import { getDefaultSelection, getToggleResult } from '../../lib/lessonBlocks';
import styles from './ToggleBuilder.module.css';

export default function ToggleBuilder({ builder }) {
  const groupId = useId();
  const [selection, setSelection] = useState(() => getDefaultSelection(builder));
  const result = getToggleResult(builder, selection);
  const heading = result.style || result.glass?.label || '';

  return (
    <LessonStation id="try-it" eyebrow={builder.eyebrow} title={builder.title} intro={builder.intro}>
      <div className={styles.layout}>
        <div className={styles.controls}>
          {builder.controls.map((control) => (
            <ChoiceGroup
              key={control.id}
              name={`${groupId}-${control.id}`}
              legend={control.label}
              options={control.options.map((option) => ({ value: option.id, label: option.label }))}
              value={selection[control.id]}
              onChange={(optionId) =>
                setSelection((current) => ({ ...current, [control.id]: optionId }))
              }
            />
          ))}
        </div>

        <div className={styles.resultColumn}>
          <div className={styles.result} aria-live="polite">
            <div className={styles.resultHead}>
              {result.glass && (
                <span
                  className={styles.glass}
                  data-color={result.glass.color}
                  role="img"
                  aria-label={`Glass color: ${result.glass.label}`}
                />
              )}
              <div className={styles.resultTitle}>
                <span className={styles.resultLabel}>In the glass</span>
                {heading && <span className={styles.styleName}>{heading}</span>}
              </div>
            </div>
            <NoteChips notes={result.notes} />
            {result.description && <p className={styles.description}>{result.description}</p>}
          </div>
          {builder.footnote && <p className={styles.footnote}>{builder.footnote}</p>}
        </div>
      </div>
    </LessonStation>
  );
}