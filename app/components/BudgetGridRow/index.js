// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';
import { BudgetGrid } from '../../containers/BudgetGrid/index';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  onClick: (id: number) => void,
};

const BudgetGridRow = ({ transaction, categories, onClick }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];

  const handleClick = e => onClick(id);

  return (
    <tr key={id} onClick={handleClick}>
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
    </tr>
  );
};

BudgetGridRow.defaultProps = {
  onClick: () => {},
};

export default BudgetGridRow;
