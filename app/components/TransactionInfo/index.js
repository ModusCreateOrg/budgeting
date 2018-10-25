// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import DonutChart from 'components/DonutChart';
import type { Transaction } from 'modules/transactions';
import type { TransactionGraphData } from 'containers/TransactionDetail';
import styles from './style.scss';

type TransactionInfoProps = {
  transaction: Transaction,
  isInflow: boolean,
  percentage: number,
  data: TransactionGraphData[],
};

const TransactionInfo = ({ transaction, isInflow, percentage, data }: TransactionInfoProps) => (
  <div className={styles.transactionDetail}>
    <h1>{transaction.description}</h1>
    <h2 className={isInflow ? styles.inflow : styles.outflow}>
      {isInflow ? '+' : '-'}
      {percentage}%
    </h2>
    <Link to="/budget">Back</Link>
    <div className={styles.donutChartContainer}>
      <DonutChart data={data} dataLabel="label" dataKey="id" />
    </div>
  </div>
);

export default TransactionInfo;
