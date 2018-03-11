// @flow
import * as React from 'react';
import { scaleLinear } from 'd3';
import formatAmount from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

const Transaction = ({ id, description, value, balance }) => {
  const amount = Math.abs(value);
  const percentage = formatAmount(amount / balance, false, 'percent');

  const isNegative = value < 0;
  const sign = isNegative ? '-' : '+';

  const balanceLabel = isNegative ? 'Expenses' : 'Incomes';
  const chartData = [
    { id, description, amount },
    { id: Infinity, description: `Other ${balanceLabel}`, amount: balance - amount },
  ];

  // Set the color scheme for the chart based on the type of transaction.
  const scheme = [isNegative ? 'red' : 'green', 'ivory'];
  const color = scaleLinear().range(scheme);

  return (
    <React.Fragment>
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
        innerRatio={Infinity}
      />
    </React.Fragment>
  );
};

export default Transaction;
