// @flow

import * as React from 'react';

import styles from './style.scss';

type BalanceProps = {
  children: React.Node,
};

const Balance = ({ children }: BalanceProps) =>
  <div className={styles.balanceRowContainer}>
    <div className={styles.balanceRow}>
      {children}
    </div>
  </div>;

export default Balance;
