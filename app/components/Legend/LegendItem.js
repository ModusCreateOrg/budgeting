// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import formatPorcentageAmount from 'utils/formatPorcentageAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
};

const LegendItem = ({ color, label, value, type }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}>
      {type === 'porcentage' ? formatPorcentageAmount(value, false).text : formatAmount(value).text}{' '}
    </span>
  </li>
);

export default LegendItem;
