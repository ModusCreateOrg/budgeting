// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import NavLink from 'components/NavLink';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
};

const BudgetGridRow = ({ transaction, categories }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];

  return (
    <tr key={id} className={styles.rows}>
      <td>
        <NavLink to={`budgetDetails/${id}`} label="Category" styles={styles} />
        <NavLink to={`budgetDetails/${id}`} label={category} styles={styles} />
      </td>
      <td>
        <NavLink to={`budgetDetails/${id}`} label="Description" styles={styles} />
        <NavLink to={`budgetDetails/${id}`} label={description} styles={styles} />
      </td>
      <td className={amountCls}>
        <NavLink to={`budgetDetails/${id}`} label="Amount" styles={styles} />
        <NavLink to={`budgetDetails/${id}`} label={amount.text} styles={styles} />
      </td>
    </tr>
  );
};

export default BudgetGridRow;
