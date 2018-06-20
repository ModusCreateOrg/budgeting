// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  type: string
};

const LegendItem = ({ color, label, value,type }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {type == "default" ? formatAmount(value).text: value+"%"} </span>
  </li>
);

export default LegendItem;
