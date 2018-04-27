// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
};

const LegendItem = ({ color, label, value, prefix = '' }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}><i>{prefix}</i>{value}</span>
  </li>
);

export default LegendItem;
