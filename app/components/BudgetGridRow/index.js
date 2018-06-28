// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
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
    <tr className={styles.row} key={id} title="View details">
      <td>
        <Link
          to={{
            pathname: `/transaction/${id}`,
            state: { modal: true },
          }}
          className={styles.link}
        >
          <div className={styles.cellLabel}>Category</div>
          <div className={styles.cellContent}>{category}</div>
        </Link>
      </td>
      <td>
        <Link
          to={{
            pathname: `/transaction/${id}`,
            state: { modal: true },
          }}
          className={styles.link}
        >
          <div className={styles.cellLabel}>Description</div>
          <div className={styles.cellContent}>{description}</div>
        </Link>
      </td>
      <td className={amountCls}>
        <Link
          to={{
            pathname: `/transaction/${id}`,
            state: { modal: true },
          }}
          className={styles.link}
        >
          <div className={styles.cellLabel}>Amount</div>
          <div className={styles.cellContent}>{amount.text}</div>
        </Link>
      </td>
      <td className={amountCls}>
        <Link
          to={{
            pathname: `/transaction/${id}`,
            state: { modal: true },
          }}
          className={styles.link}
        >
          <div className={styles.cellLabel}>%</div>
          <div className={styles.cellContent}>{percentage}</div>
        </Link>
      </td>
    </tr>
  );
};

export default BudgetGridRow;
