// @flow

import * as React from 'react';

import styles from './style.scss';

type BalanceProps = {
  title: string,
  amount: Object,
  colorize: boolean,
};

const Balance = ({ title, amount, colorize }: BalanceProps) => {
  const amountCls = colorize && amount.isNegative ? styles.neg : styles.pos || '';

  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.balanceItem}>
        <div className={`${styles.balanceAmount} ${amountCls}`}>
          {amount.text}
        </div>
        <div className={styles.balanceTitle}>
          {title}
        </div>
      </div>
    </div>
  );
};

Balance.defaultProps = {
  colorize: true,
};

export default Balance;
