// @flow
import * as React from 'react';
import type { TransactionSummary } from 'selectors/transactions';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type XaxisProps = {
  transform: string,
  labelColor: string,
  valueColor: string,
  data: {
    inflow: TransactionSummary[],
    outflow: TransactionSummary[],
  },
  totals: Object,
  xScale: Function,
};

const Xaxis = ({ data, totals, transform, labelColor, valueColor, xScale }: XaxisProps) => (
  <g className={styles.xAxis} transform={transform}>
    {Object.keys(data).map((key, idx) => (
      <g key={key} transform={`translate(${xScale(idx) + xScale.bandwidth() / 2}, 0)`}>
        <line stroke={labelColor} y2="6" x1="0.5" x2="0.5" />
        <text fill={labelColor} y="9" x="0.5" dy="0.8em">
          {key.toUpperCase()}
        </text>
        <text className={styles.value} fill={valueColor} y="35" x="0.5" dy="0.6em">
          {formatAmount(totals[key]).text}
        </text>
      </g>
    ))}
  </g>
);

Xaxis.defaultProps = {
  labelColor: '#000',
  valueColor: '#999',
  transform: '',
};

export default Xaxis;
