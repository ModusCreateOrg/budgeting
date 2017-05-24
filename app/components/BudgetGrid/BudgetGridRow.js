// @flow

import React from 'react';
import formatAmount from 'utils/formatAmount';
import type Transaction from 'modules/transactions';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Object,
};

const BudgetGridRow = ({ transaction, categories }: BudgetGridRowProps): React$Element<any> => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];

  return (
    <tr key={id}>
      <td>{category}</td>
      <td>{description}</td>
      <td className={amountCls}>{amount.text}</td>
    </tr>
  );
};

export default BudgetGridRow;
