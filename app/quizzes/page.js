'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './page.module.css';

import introductoryQuestions from '../../data/questionsIntroductory.json';
import intermediateQuestions from '../../data/questionsIntermediate.json';
import advancedQuestions from '../../data/questionsAdvanced.json';

/* ───────────────────────────────────────────
   HELPER: Fisher-Yates Shuffle
   ─────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ───────────────────────────────────────────
   HELPER: Pick N random questions + shuffle choices
   ─────────────────────────────────────────── */
function getRandomQuestions(pool, count) {
  const picked = shuffle(pool).slice(0, count);
  return picked.map((q) => ({
    ...q,
    choices: shuffle(q.choices),
  }));
}

/* ───────────────────────────────────────────
   QUESTION POOLS BY LEVEL
   ─────────────────────────────────────────── */
const questionPools = {
  introductory: introductoryQuestions,
  intermediate: intermediateQuestions,
  advanced: advancedQuestions,
};

/* ───────────────────────────────────────────
   MAIN COMPONENT
   ─────────────────────────────────────────── */
export default function QuizPage() {
  // ── Setup State ──
  const [level, setLevel] = useState('introductory');
  const [mode, setMode] = useState('quiz');
  const [gameState, setGameState] = useState('setup'); // setup | playing | finished
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  // ── Timer State ──
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef(null);

  // ── Exam mode: store all answers, reveal at end ──
  const [examAnswers, setExamAnswers] = useState([]);

  /* ─────────────────────────────
     TIMER LOGIC
     ───────────────────────────── */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Quiz mode: per-question timer (20 seconds)
  const startQuizTimer = useCallback(() => {
    clearTimer();
    setTimeRemaining(20);
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  // Exam mode: global timer (30 minutes = 1800 seconds)
  const startExamTimer = useCallback(() => {
    clearTimer();
    setTimeRemaining(1800);
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  /* Quiz mode: auto-handle time-out */
  useEffect(() => {
    if (mode === 'quiz' && gameState === 'playing' && timeRemaining === 0 && !answered) {
      handleTimeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  /* Exam mode: auto-finish when global timer hits 0 */
  useEffect(() => {
    if (mode === 'exam' && gameState === 'playing' && timeRemaining === 0) {
      finishExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  /* Cleanup timer on unmount */
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  /* ─────────────────────────────
     HANDLE TIME OUT (quiz mode)
     ───────────────────────────── */
  function handleTimeOut() {
    setAnswered(true);
    setSelectedAnswer(null);
    const currentQ = questions[currentIndex];
    setResults((prev) => [
      ...prev,
      {
        question: currentQ.question,
        yourAnswer: 'Time expired',
        correctAnswer: currentQ.answer,
        isCorrect: false,
      },
    ]);
  }

  /* ─────────────────────────────
     START TEST
     ───────────────────────────── */
  function startTest() {
    const pool = questionPools[level];
    const count = mode === 'quiz' ? 10 : 20;
    const selected = getRandomQuestions(pool, Math.min(count, pool.length));

    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setResults([]);
    setExamAnswers([]);
    setGameState('playing');

    if (mode === 'quiz') {
      startQuizTimer();
    } else {
      startExamTimer();
    }
  }

  /* ─────────────────────────────
     SELECT ANSWER
     ───────────────────────────── */
  function selectAnswer(choice) {
    if (answered && mode === 'quiz') return;
    if (mode === 'exam' && examAnswers[currentIndex] !== undefined) return;

    const currentQ = questions[currentIndex];
    const isCorrect = choice === currentQ.answer;

    if (mode === 'quiz') {
      // Instant feedback
      clearTimer();
      setSelectedAnswer(choice);
      setAnswered(true);
      if (isCorrect) setScore((prev) => prev + 1);
      setResults((prev) => [
        ...prev,
        {
          question: currentQ.question,
          yourAnswer: choice,
          correctAnswer: currentQ.answer,
          isCorrect,
        },
      ]);
    } else {
      // Exam mode: store answer, no feedback
      setSelectedAnswer(choice);
      const newExamAnswers = [...examAnswers];
      newExamAnswers[currentIndex] = choice;
      setExamAnswers(newExamAnswers);
    }
  }

  /* ─────────────────────────────
     NEXT QUESTION
     ───────────────────────────── */
  function nextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      if (mode === 'exam') {
        finishExam();
      } else {
        clearTimer();
        setGameState('finished');
      }
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setAnswered(false);

    if (mode === 'quiz') {
      startQuizTimer();
    }
  }

  /* ─────────────────────────────
     FINISH EXAM (exam mode)
     ───────────────────────────── */
  function finishExam() {
    clearTimer();
    let examScore = 0;
    const examResults = questions.map((q, i) => {
      const userAnswer = examAnswers[i] || 'No answer';
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) examScore++;
      return {
        question: q.question,
        yourAnswer: userAnswer,
        correctAnswer: q.answer,
        isCorrect,
      };
    });
    setScore(examScore);
    setResults(examResults);
    setGameState('finished');
  }

  /* ─────────────────────────────
     RESTART
     ───────────────────────────── */
  function restartQuiz() {
    clearTimer();
    setGameState('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setResults([]);
    setExamAnswers([]);
    setTimeRemaining(0);
  }

  /* ─────────────────────────────
     FORMAT TIME
     ───────────────────────────── */
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  /* ─────────────────────────────
     BUTTON STYLE LOGIC (quiz mode)
     ───────────────────────────── */
  function getChoiceClass(choice) {
    if (mode === 'exam') {
      if (examAnswers[currentIndex] === choice) return styles.choiceSelected;
      return styles.choice;
    }
    // Quiz mode
    if (!answered) return styles.choice;
    const currentQ = questions[currentIndex];
    if (choice === currentQ.answer) return styles.choiceCorrect;
    if (choice === selectedAnswer && choice !== currentQ.answer) return styles.choiceWrong;
    return styles.choiceDisabled;
  }

  /* ─────────────────────────────
     CURRENT QUESTION DATA
     ───────────────────────────── */
  const currentQuestion = questions[currentIndex];

  /* ═══════════════════════════════
     RENDER
     ═══════════════════════════════ */
  return (
    <div>
      <Header />
      <main className={styles.quizMain}>
        <div className={styles.quizContainer}>

          {/* ── TITLE SECTION ── */}
          <h1 className={styles.title}>Test Your Knowledge on Wine</h1>
          <p className={styles.subtitle}>Choose your level and start now!</p>

          {/* ── SETUP PANEL ── */}
          {gameState === 'setup' && (
            <div className={styles.setupPanel}>
              {/* Level Dropdown */}
              <label className={styles.label}>Start here:</label>
              <select
                className={styles.dropdown}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="introductory">Level 1 - Introductory</option>
                <option value="intermediate">Level 2 - Intermediate</option>
                <option value="advanced">Level 3 - Advanced</option>
              </select>

              {/* Mode Selection */}
              <p className={styles.modeLabel}>Select Mode: Quiz or Exam</p>
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="mode"
                    value="quiz"
                    checked={mode === 'quiz'}
                    onChange={(e) => setMode(e.target.value)}
                  />
                  <span>Quiz Mode (10 questions)</span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="mode"
                    value="exam"
                    checked={mode === 'exam'}
                    onChange={(e) => setMode(e.target.value)}
                  />
                  <span>Exam Mode (20 questions)</span>
                </label>
              </div>

              {/* Start Button */}
              <button className={styles.startButton} onClick={startTest}>
                Start Test
              </button>
            </div>
          )}

          {/* ── PLAYING STATE ── */}
          {gameState === 'playing' && currentQuestion && (
            <div className={styles.questionPanel}>
              {/* Progress */}
              <p className={styles.progress}>
                Question {currentIndex + 1} of {questions.length}
              </p>

              {/* Question */}
              <h2 className={styles.questionText}>{currentQuestion.question}</h2>

              {/* Answer Choices - 2x2 Grid */}
              <div className={styles.choicesGrid}>
                {currentQuestion.choices.map((choice, i) => (
                  <button
                    key={i}
                    className={getChoiceClass(choice)}
                    onClick={() => selectAnswer(choice)}
                    disabled={mode === 'quiz' && answered}
                  >
                    {choice}
                  </button>
                ))}
              </div>

              {/* Timer */}
              <p className={styles.timer}>
                Time remaining: {formatTime(timeRemaining)}
              </p>

              {/* Quiz Mode: Instant Feedback */}
              {mode === 'quiz' && answered && (
                <div className={styles.feedback}>
                  {selectedAnswer === null ? (
                    <p className={styles.feedbackTimeout}>
                      Time&apos;s up! Correct: {currentQuestion.answer}
                    </p>
                  ) : selectedAnswer === currentQuestion.answer ? (
                    <p className={styles.feedbackCorrect}>Correct!</p>
                  ) : (
                    <p className={styles.feedbackWrong}>
                      Wrong! Correct: {currentQuestion.answer}
                    </p>
                  )}
                </div>
              )}

              {/* Next Button */}
              {(mode === 'quiz' && answered) || mode === 'exam' ? (
                <button className={styles.nextButton} onClick={nextQuestion}>
                  {currentIndex + 1 >= questions.length
                    ? mode === 'exam'
                      ? 'Finish Exam'
                      : 'See Results'
                    : 'Next'}
                </button>
              ) : null}
            </div>
          )}

          {/* ── RESULTS STATE ── */}
          {gameState === 'finished' && (
            <div className={styles.resultsPanel}>
              <p className={styles.scoreText}>
                Your Score: {score} out of {questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </p>

              {/* Action Buttons */}
              <div className={styles.resultActions}>
                <button className={styles.restartButton} onClick={restartQuiz}>
                  Restart Quiz
                </button>
                <Link href="/" className={styles.homeButton}>
                  Home
                </Link>
              </div>

              {/* Incorrect Answers Review */}
              {results.filter((r) => !r.isCorrect).length > 0 && (
                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewHeading}>Review Incorrect Answers</h3>
                  {results
                    .filter((r) => !r.isCorrect)
                    .map((r, i) => (
                      <div key={i} className={styles.reviewCard}>
                        <p className={styles.reviewQuestion}>
                          <strong>Q:</strong> {r.question}
                        </p>
                        <p className={styles.reviewYours}>
                          <strong>Your Answer:</strong>{' '}
                          <span className={styles.wrongText}>{r.yourAnswer}</span>
                        </p>
                        <p className={styles.reviewCorrect}>
                          <strong>Correct Answer:</strong>{' '}
                          <span className={styles.correctText}>{r.correctAnswer}</span>
                        </p>
                      </div>
                    ))}
                </div>
              )}

              {/* Perfect Score Message */}
              {results.filter((r) => !r.isCorrect).length === 0 && (
                <div className={styles.perfectScore}>
                  <p>Perfect score! Outstanding knowledge.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}