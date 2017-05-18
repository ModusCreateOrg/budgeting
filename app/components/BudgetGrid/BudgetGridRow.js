// @flow

import React from 'react';

import formatAmount from 'utils/formatAmount';

import styles from './style.scss';

// disable false positives
/* eslint-disable react/no-unused-prop-types */
type Transaction = {|
  id: number,
  categoryId: string,
  description: string,
  value: number,
|};

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
