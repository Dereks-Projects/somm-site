'use client';

import { useState, useEffect } from 'react';
import styles from './QuizSection.module.css';

export default function QuizSection({ questionData }) {
  const [difficulty, setDifficulty] = useState('easy');
  const [quizStatus, setQuizStatus] = useState('not-started');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (quizStatus !== 'in-progress') return;
    
    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStatus]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    const filtered = questionData.filter(q => q.level === difficulty);
    const shuffled = shuffleArray(filtered);
    const selected = shuffled.slice(0, 10);
    
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(20);
    setQuizStatus('in-progress');
  };

  const handleAnswer = (selectedAnswer) => {
  
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    const newAnswer = {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect: isCorrect
    };
    
    setUserAnswers([...userAnswers, newAnswer]);
    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
    } else {
      setQuizStatus('finished');
    }
  };

  const resetQuiz = () => {
    setQuizStatus('not-started');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(20);
  };

  if (quizStatus === 'not-started') {
    return (
      <section className={styles.quizSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>Test Your Beverage Knowledge</h2>
          <p className={styles.subtitle}>Challenge yourself with these test questions about wine, spirits, and beer from around the globe.</p>
          
          <div className={styles.startScreen}>
            <div className={styles.difficultySelector}>
              <label htmlFor="difficulty">Select Difficulty:</label>
              <select 
                id="difficulty"
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className={styles.dropdown}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <button onClick={startQuiz} className={styles.button}>
              Start Quiz
            </button>
            
            <div className={styles.scoreDisplay}>Score: 0 / 10</div>
            <button onClick={resetQuiz} className={styles.button}>
              Reset Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (quizStatus === 'in-progress') {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <section className={styles.quizSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>Test Your Beverage Knowledge</h2>
          
          <div className={styles.timer}>Time left: {timeLeft}s</div>
          
          <div className={styles.questionCard}>
            <p className={styles.questionLabel}>Question:</p>
            <h3 className={styles.questionText}>{currentQuestion.question}</h3>
            
            <div className={styles.choicesGrid}>
              {currentQuestion.choices.map((choice, index) => (
                <button
                key={`${currentQuestionIndex}-${index}`}
                  onClick={() => handleAnswer(choice)}
                  className={styles.choiceButton}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.progress}>
            Question {currentQuestionIndex + 1} of 10
          </div>
          
          <div className={styles.scoreDisplay}>Score: {score} / 10</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.quizSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Test Your Beverage Knowledge</h2>
        
        <div className={styles.resultsScreen}>
          <div className={styles.finalScore}>Score: {score} / 10</div>
          
          <button onClick={resetQuiz} className={styles.button}>
            Reset Quiz
          </button>
          
          {userAnswers.some(a => !a.isCorrect) && (
            <div className={styles.review}>
              <h3 className={styles.reviewTitle}>Review Incorrect Answers:</h3>
              <ul className={styles.reviewList}>
                {userAnswers.filter(a => !a.isCorrect).map((answer, index) => (
                  <li key={index} className={styles.reviewItem}>
                    <p className={styles.reviewQuestion}>Q: {answer.question}</p>
                    <p className={styles.wrongAnswer}>Your answer: {answer.userAnswer || 'No answer (time expired)'}</p>
                    <p className={styles.correctAnswer}>Correct answer: {answer.correctAnswer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}