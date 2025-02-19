    import React from 'react';
    import PropTypes from 'prop-types';
    import styles from './ProgressBar.module.css'

    interface ProgressBarProps {
      current: number;
      total: number;
    }

    /**
     * A visual progress indicator component.
     */
    const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
      const progress = (current / total) * 100;

      return (
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>
      );
    };

    ProgressBar.propTypes = {
      current: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    };

    export default ProgressBar;
