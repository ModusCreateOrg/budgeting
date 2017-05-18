// @flow

import React from 'react';

import styles from './style.scss';

type BalanceProps = {
  children: React$Element<any>,
};

const Balance = ({ children }: BalanceProps): React$Element<any> => (
  <div className={styles.balanceRowContainer}>
    <div className={styles.balanceRow}>
      {children}
    </div>
  </div>
);

export default Balance;
