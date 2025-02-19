    import React, { useEffect, useState } from 'react';
    import PropTypes from 'prop-types';
    import styles from './ResultScreen.module.css';

    interface ResultScreenProps {
      score: number;
      totalQuestions: number;
      correctAnswers: number;
      incorrectAnswers: number;
      onRetry: () => void;
    }

    /**
     * Displays the final score and performance breakdown.
     */
    const ResultScreen: React.FC<ResultScreenProps> = ({
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      onRetry,
    }) => {

      const [highScore, setHighScore] = useState(0);

      useEffect(() => {
        // Load and update high score
        const savedHighScore = localStorage.getItem('highScore');
        const currentHighScore = savedHighScore ? parseInt(savedHighScore) : 0;
        if (score > currentHighScore) {
          localStorage.setItem('highScore', score.toString());
          setHighScore(score);
        } else {
          setHighScore(currentHighScore);
        }
      }, [score]);


      return (
        <div className={styles.resultContainer}>
          <h2 className={styles.resultTitle}>Quiz Results</h2>
          <p className={styles.scoreText}>Your Score: {score}%</p>
          <p className={styles.detailText}>Correct Answers: {correctAnswers}</p>
          <p className={styles.detailText}>Incorrect Answers: {incorrectAnswers}</p>
          {highScore > 0 && <p className={styles.highScoreText}>High Score: {highScore}%</p>}
          <button className={styles.retryButton} onClick={onRetry}>
            Retry Quiz
          </button>
        </div>
      );
    };

    ResultScreen.propTypes = {
      score: PropTypes.number.isRequired,
      totalQuestions: PropTypes.number.isRequired,
      correctAnswers: PropTypes.number.isRequired,
      incorrectAnswers: PropTypes.number.isRequired,
      onRetry: PropTypes.func.isRequired,
    };

    export default ResultScreen;
