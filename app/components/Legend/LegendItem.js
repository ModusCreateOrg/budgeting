// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  percentage: boolean,
};

const LegendItem = ({ color, label, value, percentage }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {percentage ? `${(value * 100).toFixed(2)}%` : formatAmount(value).text} </span>
  </li>
);

export default LegendItem;
