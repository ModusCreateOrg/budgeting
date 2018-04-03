// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import PieChart from 'components/PieChart';

import styles from './style.scss';

type BudgetItemDetailProps = {
  transaction: Transaction,
  balance: number,
};

const BudgetItemDetail = ({ transaction, balance }: BudgetItemDetailProps) => {
  const { value, description } = transaction;

  const contribPercentage = value / balance * 100;
  const remainingBalance = Math.abs(balance) - Math.abs(value);
  const remainingPercentage = 100 - contribPercentage;

  let isIncome = true;
  if (value < 0) {
    isIncome = false;
  }

  const data = [
    {
      categoryId: 'item',
      category: `${contribPercentage.toFixed(2)}% - ${description}`,
      value: Math.abs(value),
    },
    {
      categoryId: 'total',
      category: `${remainingPercentage.toFixed(2)}% - Other ${isIncome ? 'incomes' : 'outcomes'}`,
      value: Math.abs(remainingBalance),
    },
  ];

  return (
    <div className={styles.budgetItemDetail}>
      <h1>{transaction.description}</h1>
      <h2>
        <span className={isIncome ? styles.income : styles.outcome}>{isIncome ? '+' : '-'}</span>
        {contribPercentage.toFixed(2)}%
      </h2>
      <PieChart data={data} dataLabel="category" dataKey="categoryId" />
    </div>
  );
};

export default BudgetItemDetail;
