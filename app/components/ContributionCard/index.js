// @flow
import * as React from 'react';
import { scaleOrdinal } from 'd3';
import {
  TRANSACTION_TYPE_INFLOW,
  TRANSACTION_TYPE_OUTFLOW,
  type TransactionContribution,
} from 'selectors/transactions';
import DonutChart from 'components/DonutChart';
import styles from './styles.scss';

const colors = {
  [TRANSACTION_TYPE_INFLOW]: [styles.inflowColor1, styles.inflowColor2],
  [TRANSACTION_TYPE_OUTFLOW]: [styles.outflowColor1, styles.outflowColor2],
};

const getColorScheme = type =>
  scaleOrdinal()
    .domain([0, 1])
    .range(colors[type]);

const getChartData = (value, total) => [
  { key: 0, categoryId: '0', value, label: 'Current Item' },
  { key: 1, categoryId: '1', value: total - value, label: 'Rest' },
];

const renderPercentage = (percentage, type) => {
  const className = type === TRANSACTION_TYPE_INFLOW ? styles.inflow : styles.outflow;
  const sign = type === TRANSACTION_TYPE_INFLOW ? '+' : '-';
  return (
    <React.Fragment>
      <span className={className}>{sign}</span>
      {percentage}%
    </React.Fragment>
  );
};

type ContributionCardProps = {
  contribution: TransactionContribution,
};

const ContributionCard = ({ contribution: { transaction, value, total, percentage, type } }: ContributionCardProps) => (
  <div>
    <h1 className={styles.heading}>{transaction.description}</h1>
    <h3 className={styles.percentage}>{renderPercentage(percentage, type)}</h3>
    <DonutChart
      dataLabel="label"
      dataKey="key"
      innerRatio={0}
      color={getColorScheme(type)}
      data={getChartData(value, total)}
    />
  </div>
);

export default ContributionCard;
