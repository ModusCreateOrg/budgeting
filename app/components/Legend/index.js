// @flow
import * as React from 'react';
import cx from 'classnames';
import type { TransactionSummary } from 'selectors/transactions';
import LegendItem from './LegendItem';
import styles from './styles.scss';

type LegendType = {
  data: TransactionSummary[],
  dataValue: string,
  dataLabel: string,
  dataKey: string,
  color: Function,
  reverse: boolean,
};

const Legend = ({ data, color, dataValue, dataLabel, dataKey, reverse }: LegendType) => (
  <ul className={cx(styles.legend, { [styles.reverse]: reverse })}>
    {data.map((item, idx) => (
      <LegendItem color={color(idx)} key={item[dataKey]} label={item[dataLabel]} value={item[dataValue]} />
    ))}
  </ul>
);

Legend.defaultProps = {
  reverse: false,
};

export default Legend;
