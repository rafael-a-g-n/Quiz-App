    import React from 'react';
    import PropTypes from 'prop-types';
    import styles from './AnswerButton.module.css';

    interface AnswerButtonProps {
      answer: string;
      isCorrect?: boolean;
      isSelected?: boolean;
      onAnswerSelect: (answer: string) => void;
      isDisabled: boolean;
    }
    /**
     * A reusable button component for displaying answer options.
     */
    const AnswerButton: React.FC<AnswerButtonProps> = ({
      answer,
      isCorrect,
      isSelected,
      onAnswerSelect,
      isDisabled,
    }) => {

      let buttonClasses = styles.answerButton;

        if (isSelected) {
          buttonClasses += isCorrect ? ` ${styles.correct}` : ` ${styles.incorrect}`;
        }

      return (
        <button
          className={buttonClasses}
          onClick={() => onAnswerSelect(answer)}
          disabled={isDisabled}
          aria-label={answer}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      );
    };

    AnswerButton.propTypes = {
      answer: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool,
      isSelected: PropTypes.bool,
      onAnswerSelect: PropTypes.func.isRequired,
      isDisabled: PropTypes.bool.isRequired,
    };

    export default AnswerButton;
