// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  valueFormat: Function,
};

const LegendItem = ({ color, label, value, valueFormat }: LegendItemProps) => {
  let formattedValue = formatAmount(value).text;
  if (valueFormat) { //If a customized format is defined it will be executed
    formattedValue = valueFormat(value);
  }
  return (
    <li style={{ color }}>
      <span>{label}</span>
      <span className={styles.value}> {formattedValue} </span>
    </li>
  );
};

export default LegendItem;
