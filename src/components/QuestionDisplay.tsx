    import React from 'react';
    import PropTypes from 'prop-types';
    import AnswerButton from './AnswerButton';
    import styles from './QuestionDisplay.module.css';

    interface QuestionDisplayProps {
      question: string;
      answers: string[];
      correctAnswer: string;
      onAnswerSelect: (answer: string) => void;
      isAnswerSelected: boolean;
      selectedAnswer: string | null;
      disableAnswers: boolean;
    }

    /**
     * Displays a single question and its answer options.
     */
    const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
      question,
      answers,
      correctAnswer,
      onAnswerSelect,
      isAnswerSelected,
      selectedAnswer,
      disableAnswers
    }) => {
      return (
        <div className={styles.questionContainer}>
          <h2 className={styles.questionText} dangerouslySetInnerHTML={{__html: question}} />
          <div className={styles.answerContainer}>
            {answers.map((answer, index) => (
              <AnswerButton
                key={index}
                answer={answer}
                isCorrect={isAnswerSelected && answer === correctAnswer}
                isSelected={isAnswerSelected && answer === selectedAnswer}
                onAnswerSelect={onAnswerSelect}
                isDisabled={disableAnswers}
              />
            ))}
          </div>
        </div>
      );
    };

    QuestionDisplay.propTypes = {
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
      onAnswerSelect: PropTypes.func.isRequired,
      isAnswerSelected: PropTypes.bool.isRequired,
      selectedAnswer: PropTypes.string,
      disableAnswers: PropTypes.bool.isRequired,
    };

    export default QuestionDisplay;
