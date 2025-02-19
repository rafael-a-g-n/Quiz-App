    import React from 'react';
    import PropTypes from 'prop-types';
    import styles from './ScoreDisplay.module.css';

    interface ScoreDisplayProps {
      correctAnswers: number;
      incorrectAnswers: number;
    }

    /**
     * Displays the real-time score (correct/incorrect counts).
     */
    const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ correctAnswers, incorrectAnswers }) => {
      return (
        <div className={styles.scoreContainer}>
          <span className={styles.correctScore}>Correct: {correctAnswers}</span>
          <span className={styles.incorrectScore}>Incorrect: {incorrectAnswers}</span>
        </div>
      );
    };

    ScoreDisplay.propTypes = {
      correctAnswers: PropTypes.number.isRequired,
      incorrectAnswers: PropTypes.number.isRequired,
    };

    export default ScoreDisplay;
