// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  isPercentage: boolean,
};

const LegendItem = ({ color, label, value, isPercentage }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {isPercentage ? `${value}%` : formatAmount(value).text} </span>
  </li>
);

export default LegendItem;
