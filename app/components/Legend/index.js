// @flow
import * as React from 'react';
import cx from 'classnames';
import LegendItem from './LegendItem';
import styles from './styles.scss';
import type { TransactionSummary } from '../../selectors/transactions';
import formatAmount from 'utils/formatAmount';

type LegendType = {
  data: TransactionSummary[],
  dataValue: string,
  dataLabel: string,
  dataKey: string,
  color: Function,
  reverse: boolean,
  formatter: (value: number) => string
};


function defaultFormatter(value: number) {
  return formatAmount(value).text
}

const Legend = ({ data, color, dataValue, dataLabel, dataKey, reverse, formatter }: LegendType) => (
  <ul className={cx(styles.legend, { [styles.reverse]: reverse })}>
    {data.map((item, idx) => (
      <LegendItem color={color(idx)} key={item[dataKey]} label={item[dataLabel]} value={item[dataValue]} formatter={formatter} />
    ))}
  </ul>
);

Legend.defaultProps = {
  reverse: false,
  formatter: defaultFormatter
};

export default Legend;
