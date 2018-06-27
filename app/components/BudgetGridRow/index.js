// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import getPercentage from 'utils/getPercentage';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  transactions: Transaction[],
};

const BudgetGridRow = ({ transaction, categories, transactions }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const percentage = getPercentage(transaction, transactions);
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];

  return (
    <tr className={styles.row} key={id} title="View detail">
      <td>
        <div className={styles.cellLabel}>Category</div>
        <div className={styles.cellContent}>{category}</div>
      </td>
      <td>
        <div className={styles.cellLabel}>Description</div>
        <div className={styles.cellContent}>{description}</div>
      </td>
      <td className={amountCls}>
        <div className={styles.cellLabel}>Amount</div>
        <div className={styles.cellContent}>{amount.text}</div>
      </td>
      <td className={amountCls}>
        <div className={styles.cellLabel}>%</div>
        <div className={styles.cellContent}>{percentage}</div>
      </td>
    </tr>
  );
};

export default BudgetGridRow;
