// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  formatLabel: boolean,
};

const LegendItem = ({ color, label, value, formatLabel }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatLabel ? formatAmount(value).text : value} </span>
  </li>
);

export default LegendItem;
