// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';

type ItemTitleProps = {
  transaction: Transaction
};

const ItemTitle = ({ transaction}: ItemTitleProps) => {
  const amount = formatAmount(transaction.value);
  const { description, percentage } = transaction;

  return (
    <div className={styles.title}>
      <h2>
        {description} : {amount.text}
      </h2>
      {amount.isNegative && <div className={styles.subtitle}>
      <span className={styles.neg}>-</span> {percentage} %</div> }
      {!amount.isNegative && <div className={styles.subtitle}>
      <span className={styles.pos}>+</span> {percentage} %</div>}
    </div>
  );
};

export default ItemTitle;
