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
  height: number,
};

class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    height: 300,
    dataValue: 'value',
  };

  render() {
    const { height, data, dataLabel, dataValue, dataKey } = this.props;

    return (
      <CircleChart
        height={height}
        innerRatio={height}
        data={data}
        dataLabel={dataLabel}
        dataValue={dataValue}
        dataKey={dataKey}
      />
    );
  }
}

export default PieChart;
