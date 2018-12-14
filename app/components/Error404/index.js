// @flow

import React from 'react';
import styles from './style.scss';

const AppError = () => (
  <div className={styles.errorScreen}>
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Sorry, item not found.</h1>
      <p> Please check if if you have entered url correctly. </p>
    </div>
  </div>
);

export default AppError;
