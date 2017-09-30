// @flow

import * as React from 'react';
import CircleChart from 'components/CircleChart';
import type { TransactionSummary } from 'selectors/transactions';
import { scaleOrdinal, schemeCategory20 } from 'd3';
import { shuffle } from 'utils/array';

const randomScheme = shuffle(schemeCategory20);

type PieChartProps = {
  data: TransactionSummary[],
  dataLabel: string,
  dataKey: string,
  dataValue: string,
  color: Function,
  height: number,
  innerRatio: number,
};

class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    color: scaleOrdinal(randomScheme),
    height: 300,
    innerRatio: 4,
    dataValue: 'value',
  };

  render() {
    const { data, dataLabel, dataValue, dataKey } = this.props;

    return <CircleChart data={data} dataLabel={dataLabel} dataValue={dataValue} dataKey={dataKey} />;
  }
}

export default PieChart;
