// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import { Link } from 'react-router-dom';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  linkToItemDetails: Function,
};

const BudgetGridRow = ({ transaction, categories, linkToItemDetails }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];
  const url = `/reports/item-details/${id}`

  return (
    <tr key={id}
    onClick={() => {
      linkToItemDetails(id);
    }}>
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

export default BudgetGridRow;
