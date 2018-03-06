// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  formatStyle: string,
};

const LegendItem = ({ color, label, value, formatStyle }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatAmount(value, false, formatStyle).text} </span>
  </li>
);

export default LegendItem;
