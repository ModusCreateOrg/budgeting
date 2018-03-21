// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import { scaleQuantile } from 'd3';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type BudgetDetailsChartProps = {
  transaction: Transaction,
  flow: Object,
};

const BudgetDetailsChart = ({ transaction, flow }: BudgetDetailsChartProps) => {
  const { id, value, description } = transaction;
  const isNegative = value < 0;
  const typeOfFlow = flow[isNegative ? 'outflow' : 'inflow'];
  const percent = (value / typeOfFlow * 100).toFixed(2);
  const amountCls = isNegative ? styles.neg : styles.pos;
  const colorRange = isNegative ? ['crimson', 'orange'] : ['lightgreen', 'steelblue'];
  const color = scaleQuantile().range(colorRange);
  const chartData = [
    { id, value: Math.abs(value), description },
    { id: id * -1, value: Math.abs(typeOfFlow - value), description: `Remaining ${isNegative ? 'Outflow' : 'Inflow'}` },
  ];

  return (
    <section className={styles.chartContainer}>
      <h1 className={styles.title}>{description}</h1>
      <h2 className={amountCls}>{`${isNegative ? '-' : '+'}${percent}%`}</h2>
      <DonutChart
        dataKey="id"
        data={chartData}
        dataLabel="description"
        dataValue="value"
        innerRatio={Math.abs(typeOfFlow)}
        color={color}
      />
    </section>
  );
};

export default BudgetDetailsChart;
