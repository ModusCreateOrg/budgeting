// @flow
import * as React from 'react';
import styles from './styles.scss';
import formatAmount from 'utils/formatAmount';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
};

const LegendItem = ({ color, label, value }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatAmount(value).text} </span>
  </li>
);

export default LegendItem;
