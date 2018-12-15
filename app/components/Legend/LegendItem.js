// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  useFormat: boolean,
};

const LegendItem = ({ color, label, value, useFormat }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {useFormat ? formatAmount(value).text : value} </span>
  </li>
);

export default LegendItem;
