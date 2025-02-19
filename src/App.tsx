    import React, { useState, useEffect, useCallback } from 'react';
    import QuizConfig from './components/QuizConfig';
    import QuestionDisplay from './components/QuestionDisplay';
    import ProgressBar from './components/ProgressBar';
    import ScoreDisplay from './components/ScoreDisplay';
    import ResultScreen from './components/ResultScreen';
    import LoadingSpinner from './components/LoadingSpinner';
    import { fetchQuizQuestions } from './api/triviaApi';
    import styles from './App.module.css';


    interface Question {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }

    /**
     * Main application component for the quiz.
     */
    const App: React.FC = () => {
      const [quizConfig, setQuizConfig] = useState<{ category: string; difficulty: string; type: string } | null>(null);
      const [questions, setQuestions] = useState<Question[]>([]);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [correctAnswers, setCorrectAnswers] = useState(0);
      const [incorrectAnswers, setIncorrectAnswers] = useState(0);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [isQuizOver, setIsQuizOver] = useState(false);
      const [isAnswerSelected, setIsAnswerSelected] = useState(false); // Track if an answer is selected
      const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
      const [timeLeft, setTimeLeft] = useState(20); // Changed initial time to 20 seconds
      const [disableAnswers, setDisableAnswers] = useState(false)

      const categories = [
        { value: '9', label: 'General Knowledge' },
        { value: '10', label: 'Entertainment: Books' },
        { value: '11', label: 'Entertainment: Film' },
        { value: '12', label: 'Entertainment: Music' },
        { value: '13', label: 'Entertainment: Musicals & Theatres' },
        { value: '14', label: 'Entertainment: Television' },
        { value: '15', label: 'Entertainment: Video Games' },
        { value: '16', label: 'Entertainment: Board Games' },
        { value: '17', label: 'Science & Nature' },
        { value: '18', label: 'Science: Computers' },
        { value: '19', label: 'Science: Mathematics' },
        { value: '20', label: 'Mythology' },
        { value: '21', label: 'Sports' },
        { value: '22', label: 'Geography' },
        { value: '23', label: 'History' },
        { value: '24', label: 'Politics' },
        { value: '25', label: 'Art' },
        { value: '26', label: 'Celebrities' },
        { value: '27', label: 'Animals' },
        { value: '28', label: 'Vehicles' },
        { value: '29', label: 'Entertainment: Comics' },
        { value: '30', label: 'Science: Gadgets' },
        { value: '31', label: 'Entertainment: Japanese Anime & Manga' },
        { value: '32', label: 'Entertainment: Cartoon & Animations' },
      ];

      const startQuiz = useCallback(async (config: { category: string; difficulty: string; type: string }) => {
        setQuizConfig(config);
        setLoading(true);
        setError('');
        setIsQuizOver(false);
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setTimeLeft(20); // Reset time to 20 seconds
        setDisableAnswers(false); // Reset disableAnswers to false
        setIsAnswerSelected(false); // Reset isAnswerSelected
        try {
          const fetchedQuestions = await fetchQuizQuestions(
            10, // Fixed number of questions
            config.category,
            config.difficulty,
            config.type
          );
          // Shuffle answers for each question *once* here
          const shuffledQuestions = fetchedQuestions.map((question: Question) => ({
            ...question,
            answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
          }));
          setQuestions(shuffledQuestions);

        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }, []);

      //Timer
      useEffect(() => {
        if (!loading && questions.length > 0 && currentQuestionIndex < questions.length && !isQuizOver) {
          if (timeLeft > 0 && !isAnswerSelected) {
            const timer = setTimeout(() => {
              setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer)
          } else if (!isAnswerSelected) { // Only call if no answer selected
              handleAnswerSelect(null);
          }
        }

      }, [timeLeft, currentQuestionIndex, questions, loading, isAnswerSelected]);

      const handleAnswerSelect = (answer: string | null) => {
        if (isAnswerSelected) return; // Prevent multiple selections

        setIsAnswerSelected(true);
        setSelectedAnswer(answer);
        setDisableAnswers(true)

        const currentQuestion = questions[currentQuestionIndex];

        if (answer === currentQuestion.correct_answer) {
          setCorrectAnswers((prev) => prev + 1);
        } else {
          setIncorrectAnswers((prev) => prev + 1);
        }

        // Move to the next question after a short delay
        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setIsAnswerSelected(false); // Reset for the next question
            setSelectedAnswer(null);
            setTimeLeft(20)
            setDisableAnswers(false)
          } else {
            setIsQuizOver(true); // End the quiz if it's the last question
          }
        }, 2000); // Delay of 2 seconds
      };

      const handleRetry = () => {
        setQuizConfig(null); // Reset quizConfig to show the configuration form again
      };

      if (error) {
        return (
          <div className={styles.errorBoundary}>
            <h2>Something went wrong!</h2>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={handleRetry}>
              Retry
            </button>
          </div>
        )
      }

      return (
        <div className={styles.appContainer}>
          <h1 className={styles.appTitle}>Quiz Application</h1>
          {!quizConfig ? (
            <QuizConfig onConfigSubmit={startQuiz} categories={categories} />
          ) : loading ? (
            <LoadingSpinner />
          ) : isQuizOver ? (
            <ResultScreen
              score={Math.round((correctAnswers / questions.length) * 100)}
              totalQuestions={questions.length}
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              onRetry={handleRetry}
            />
          ) : (
            <>
              <ScoreDisplay correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />
              <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
              <div className={styles.timer}>Time Left: {timeLeft}</div>
              {questions.length > 0 && (
                <QuestionDisplay
                  question={questions[currentQuestionIndex].question}
                  answers={questions[currentQuestionIndex].answers}
                  correctAnswer={questions[currentQuestionIndex].correct_answer}
                  onAnswerSelect={handleAnswerSelect}
                  isAnswerSelected={isAnswerSelected}
                  selectedAnswer={selectedAnswer}
                  disableAnswers={disableAnswers}
                />
              )}
            </>
          )}
        </div>
      );
    };

    export default App;
