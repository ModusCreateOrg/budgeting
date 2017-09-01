import React from 'react';
import styles from './style.scss';

const AppError = () => (
  <div className={styles.errorScreen}>
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>{`Sorry, something went wrong.`}</h1>
      <p>{`We're working on it and we'll get it fixed as soon as we can.`}</p>
    </div>
  </div>
);

export default AppError;
