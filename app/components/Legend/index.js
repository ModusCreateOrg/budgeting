// @flow
import * as React from 'react';
import cx from 'classnames';
import LegendItem from './LegendItem';
import styles from './styles.scss';
import type { TransactionSummary } from '../../selectors/transactions';

type LegendType = {
  data: Transaction[],
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
