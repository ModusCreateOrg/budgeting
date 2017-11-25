// @flow

import * as React from 'react';
import type { FormattedAmount } from 'utils/formatAmount';

import styles from './style.scss';

type BalanceProps = {
  title: string,
  amount: FormattedAmount,
  colorize: boolean,
  prefix: ?string,
  extraClasses?: string,
};

const Balance = ({ title, amount, colorize, prefix, extraClasses }: BalanceProps) => {
  const amountCls = colorize && amount.isNegative ? styles.neg : styles.pos || '';
  const addedClasses = typeof extraClasses === 'string' && extraClasses  || '';
  const prefixElement = typeof prefix === 'string' && (
    <div key="prefix" className={`${styles.balanceSymbol} ${addedClasses}`}>
      {prefix}
    </div>
  );

  const balanceElement = (
    <div key="item" className={`${styles.balanceWrapper} ${addedClasses}`}>
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
