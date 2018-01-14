// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import DonutChart from 'components/DonutChart';
import styles from './styles.scss';

type ItemBudgetDetailProps = {
  transaction: Transaction,
  totalBudget: number,
};

const ItemBudgetDetail = ({ transaction, totalBudget }: ItemBudgetDetailProps) => {
  const transactionPercentage = (Math.abs(transaction.value) * 100 / totalBudget).toFixed(2);
  const percentageDisplay = transaction.value > 0 ? styles.inflow : styles.outflow;
  const chartData = [
    {
      description: `${transaction.description} (${transactionPercentage}%): `,
      value: Math.abs(transaction.value),
      id: transaction.id,
    },
    {
      description: `Total budget (${(100 - transactionPercentage).toFixed(2)}): `,
      value: totalBudget,
      id: transaction.id + 1,
    },
  ];
  return (
    <div className={styles.transactionDetail}>
      <h1> {transaction.description} </h1>
      <h2 className={percentageDisplay}>
        {transaction.value > 0 ? '+' : '-'} {transactionPercentage}%
      </h2>
      <DonutChart data={chartData} dataLabel="description" dataKey="id" />
    </div>
  );
};

export default ItemBudgetDetail;
