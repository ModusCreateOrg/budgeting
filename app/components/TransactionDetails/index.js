// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';

type TransactionDetailsProps = {
  transaction: Transaction,
  percentage: string,
};

const TransactionDetails = ({ transaction, percentage }: TransactionDetailsProps) => (
  <div className="transaction__details">
    <h2>{transaction.description}</h2>
    <h4 className={transaction.value > 0 ? styles.pos : styles.neg}>
      {percentage}% (${transaction.value})
    </h4>
  </div>
);

export default TransactionDetails;
