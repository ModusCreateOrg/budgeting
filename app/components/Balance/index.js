// @flow

import * as React from 'react';
import type { FormattedAmount } from 'utils/formatAmount';

import styles from './style.scss';

type BalanceProps = {
  title: string,
  amount: FormattedAmount,
  colorize: boolean,
  prefix: ?string,
};

const Balance = ({ title, amount, colorize, prefix }: BalanceProps) => {
  const amountCls = colorize && amount.isNegative ? styles.neg : styles.pos || '';

  const prefixElement = typeof prefix === 'string' && (
    <div key="prefix" className={styles.balanceSymbol}>
      {prefix}
    </div>
  );

  const balanceElement = (
    <div key="item" className={styles.balanceWrapper}>
      <div className={styles.balanceItem}>
        <div className={`${styles.balanceAmount} ${amountCls}`}>{amount.text}</div>
        <div className={styles.balanceTitle}>{title}</div>
      </div>
    </div>
  );
  return [prefixElement, balanceElement];
};

Balance.defaultProps = {
  colorize: true,
  prefix: null,
};

export default Balance;
