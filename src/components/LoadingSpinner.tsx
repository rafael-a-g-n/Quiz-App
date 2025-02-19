    import React from 'react';
    import styles from './LoadingSpinner.module.css';
    /**
     * A reusable loading spinner component.
     */
    const LoadingSpinner: React.FC = () => {
      return (
        <div className={styles.spinnerContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      );
    };

    export default LoadingSpinner;
