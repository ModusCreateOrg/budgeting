// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  isPercent: boolean,
};
const LegendItem = ({ color, label, value, isPercent }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatAmount(value, null, isPercent).text} </span>
  </li>
);

export default LegendItem;
