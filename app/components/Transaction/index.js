// @flow
import * as React from 'react';
import { scaleLinear } from 'd3';
import type { Transaction as TransactionProps } from 'modules/transactions';
import formatAmount from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type TransactionComponentProps = {
  ...TransactionProps,
  balance: number,
};

const Transaction = ({ id, description, value, balance }: TransactionComponentProps) => {
  const amount = Math.abs(value);
  // Calculate the percentage of transaction related to the balance.
  const percentage = formatAmount(amount / balance, false, 'percent');

  const isNegative = value < 0;
  const sign = isNegative ? '-' : '+';

  const balanceLabel = isNegative ? 'Expenses' : 'Incomes';
  // The chart is composed of two values:
  const chartData = [
    // The current transaction item.
    { id, description, amount },
    // And everything else of the same type (inflows/outflows).
    { id: Infinity, description: `Other ${balanceLabel}`, amount: balance - amount },
  ];

  // Set the color scheme for the chart based on the type of transaction.
  const scheme = [isNegative ? 'red' : 'green', 'ivory'];
  const color = scaleLinear().range(scheme);

  return (
    <article>
      <h1 className={styles.title}>{description}</h1>
      <h2 className={`${isNegative ? styles.negative : styles.positive}`}>
        {sign}
        {percentage.text}
      </h2>
      <DonutChart
        data={chartData}
        dataKey="id"
        dataLabel="description"
        dataValue="amount"
        color={color}
        // We use inifnity to achieve the pie chart.
        innerRatio={Infinity}
      />
    </article>
  );
};

export default Transaction;
