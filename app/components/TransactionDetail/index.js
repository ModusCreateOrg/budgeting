// @flow
import * as React from 'react';
import formatAmountPercentageContribution from 'utils/formatAmountPercentageContribution';
import type { Transaction } from 'modules/transactions';
import NavLink from 'components/NavLink';
import styles from './style.scss';

type TransactionDetailProps = {
  transaction: Transaction,
  balance: number,
  categories: Object,
};

const TransactionDetail = ({ transaction, balance, categories }: TransactionDetailProps) => {
  const { categoryId, description } = transaction;
  const amount = formatAmountPercentageContribution(transaction.value, balance);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const category = categories[categoryId];

  return (
    <div className={styles.transactionDetailContainer}>
      <NavLink to="/budget" label="<" styles={styles} />
      {description && (
        <div className={styles.transactionDetail}>
          <div className={styles.transactionDetailTitle}>{description}</div>
          <div className={styles.transactionDetailCategory}>{category}</div>
          <div className={`${styles.transactionDetailAmount} ${amountCls}`}>{amount.text}</div>
        </div>
      )}
      {!description && (
        <div className={`${styles.transactionDetail} ${styles.transactionError}`}>
          {`The transaction doesn't exist. Please go back to Budget and select a transaction to view it's details.`}
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
