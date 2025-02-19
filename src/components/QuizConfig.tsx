    import React, { useState, useEffect } from 'react';
    import PropTypes from 'prop-types';
    import styles from './QuizConfig.module.css';
    import { ChevronDown } from 'lucide-react';

    interface QuizConfigProps {
      onConfigSubmit: (config: {
        category: string;
        difficulty: string;
        type: string;
      }) => void;
      categories: { value: string; label: string }[];
    }

    /**
     * A form component for configuring the quiz settings.
     */
    const QuizConfig: React.FC<QuizConfigProps> = ({ onConfigSubmit, categories }) => {
      const [category, setCategory] = useState('');
      const [difficulty, setDifficulty] = useState('');
      const [type, setType] = useState('');
      const [errors, setErrors] = useState<{ category?: string; difficulty?: string, type?: string }>({});

      useEffect(() => {
        // Load saved configuration from localStorage
        const savedConfig = localStorage.getItem('quizConfig');
        if (savedConfig) {
          const { category: savedCategory, difficulty: savedDifficulty, type: savedType } = JSON.parse(savedConfig);
          setCategory(savedCategory);
          setDifficulty(savedDifficulty);
          setType(savedType);
        }
      }, []);

      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newErrors: { category?: string; difficulty?: string; type?: string } = {};
        if (!category) newErrors.category = 'Please select a category.';
        if (!difficulty) newErrors.difficulty = 'Please select a difficulty.';
        if (!type) newErrors.type = 'Please select a question type.';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          const config = { category, difficulty, type };
          localStorage.setItem('quizConfig', JSON.stringify(config)); // Save to localStorage
          onConfigSubmit(config);
        }
      };

      return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>Category:</label>
            <div className={styles.selectWrapper}>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
                aria-describedby="category-error"

              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.selectIcon} />
            </div>
            {errors.category && <p id="category-error" className={styles.errorText}>{errors.category}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="difficulty" className={styles.label}>Difficulty:</label>
            <div className={styles.selectWrapper}>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={`${styles.select} ${errors.difficulty ? styles.inputError : ''}`}
                aria-describedby="difficulty-error"
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <ChevronDown className={styles.selectIcon} />
            </div>
            {errors.difficulty && <p id="difficulty-error" className={styles.errorText}>{errors.difficulty}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="type" className={styles.label}>Question Type:</label>
            <div className={styles.selectWrapper}>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`${styles.select} ${errors.type ? styles.inputError : ''}`}
                aria-describedby="type-error"
              >
                <option value="">Select Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
              <ChevronDown className={styles.selectIcon} />
            </div>
            {errors.type && <p id="type-error" className={styles.errorText}>{errors.type}</p>}
          </div>

          <button type="submit" className={styles.submitButton}>Start Quiz</button>
        </form>
      );
    };

    QuizConfig.propTypes = {
      onConfigSubmit: PropTypes.func.isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    };

    export default QuizConfig;
