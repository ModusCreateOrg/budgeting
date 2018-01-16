// @flow
import * as React from 'react';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  formatter: (value: number) => string
};

const LegendItem = ({ color, label, value, formatter }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatter(value)} </span>
  </li>
);

export default LegendItem;
