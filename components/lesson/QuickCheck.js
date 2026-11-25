// components/lesson/QuickCheck.js
// "Quick check" block: a few multiple-choice questions on the lesson. Each
// answer is marked right away with a short explanation, and a running score
// sits beside the questions. All content comes from the lesson JSON
// (see lib/lessonBlocks.js).

'use client';

import { useState } from 'react';
import LessonStation from './LessonStation';
import { countCorrect } from '../../lib/lessonBlocks';
import styles from './QuickCheck.module.css';

function getOptionState(optionIndex, question, chosenIndex) {
  if (chosenIndex === null) return 'open';
  if (optionIndex === question.answer) return 'correct';
  return optionIndex === chosenIndex ? 'wrong' : 'other';
}

const TAGS = { correct: 'Correct', wrong: 'Your answer' };

export default function QuickCheck({ quiz }) {
  const [answers, setAnswers] = useState(() => quiz.questions.map(() => null));
  const total = quiz.questions.length;
  const correct = countCorrect(quiz.questions, answers);

  const score = (
    <div className={styles.score} aria-live="polite">
      <p className={styles.scoreValue}>
        {correct} / {total}
      </p>
      <p className={styles.scoreLabel}>
        correct so far<span className={styles.srOnly}>, out of {total} questions</span>
      </p>
    </div>
  );

  return (
    <LessonStation
      id="quick-check"
      tone="light"
      eyebrow={quiz.eyebrow}
      title={quiz.title}
      intro={quiz.intro}
      aside={score}
    >
      <ul className={styles.questions}>
        {quiz.questions.map((question, questionIndex) => {
          const chosenIndex = answers[questionIndex];
          const answered = chosenIndex !== null;

          return (
            <li key={questionIndex} className={styles.question}>
              <p className={styles.prompt}>
                {questionIndex + 1}. {question.prompt}
              </p>

              <ul className={styles.options}>
                {question.options.map((option, optionIndex) => {
                  const state = getOptionState(optionIndex, question, chosenIndex);

                  return (
                    <li key={optionIndex}>
                      <button
                        type="button"
                        className={styles.option}
                        data-state={state}
                        aria-disabled={answered}
                        onClick={() => {
                          if (answered) return;
                          setAnswers((current) =>
                            current.map((value, index) => (index === questionIndex ? optionIndex : value))
                          );
                        }}
                      >
                        <span>{option}</span>
                        {TAGS[state] && <span className={styles.tag}>{TAGS[state]}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.result} aria-live="polite">
                {answered && (
                  <>
                    <p className={styles.verdict}>
                      {chosenIndex === question.answer ? 'Correct.' : 'Not quite.'}
                    </p>
                    {question.explanation && <p className={styles.explanation}>{question.explanation}</p>}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </LessonStation>
  );
}