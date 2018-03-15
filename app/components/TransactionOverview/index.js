// @flow
import * as React from 'react';
import styles from './style.scss';

type TransactionOverviewProps = {
  transactionDesc: string,
  transactionValue: number,
  contributionPercent: number,
};

const TransactionOverview = ({ transactionDesc, transactionValue, contributionPercent }: TransactionOverviewProps) => {
  const isNegative = transactionValue < 0;
  const amountCls = isNegative ? styles.neg : styles.pos || '';

  return (
    <div className={styles.transactionSection}>
      <div className={styles.transactionTitle}>{transactionDesc}</div>
      <div className={`${styles.transactionAmount} ${amountCls}`}>
        {isNegative ? `-` : `+`}
        {contributionPercent}% (${Math.abs(transactionValue)})
      </div>
    </div>
  );
};

export default TransactionOverview;
