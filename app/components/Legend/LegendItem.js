// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  percentage: Boolean,
};

const LegendItem = ({ color, label, value, percentage }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatAmount(value, true, percentage).text} </span>
  </li>
);

export default LegendItem;
