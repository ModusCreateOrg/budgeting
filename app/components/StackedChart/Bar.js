// @flow
import * as React from 'react';
import type { TransactionSummary } from 'selectors/transactions';
import Rect from './Rect';

type BarProps = {
  yScale: Function,
  colorFn: Function,
  data: TransactionSummary[],
  transform: string,
  width: number,
};

class Bar extends React.Component<BarProps> {
  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps(newProps: BarProps) {
    const { yScale, data } = newProps;
    const old = this.props;

    if (old.yScale !== yScale || old.data !== data) {
      this.updateChartVariables();
    }
  }

  yPositions: Array<any>;

  updateChartVariables = () => {
    const { yScale, data } = this.props;
    let start = yScale.range()[0];

    this.yPositions = data.map(datum => {
      start -= yScale(datum.value);
      return start;
    });
  };

  render() {
    const { yPositions } = this;
    const { width, yScale, colorFn, data, transform } = this.props;

    return (
      <g transform={transform}>
        {data.map((datum, idx) => (
          <Rect
            key={datum.categoryId}
            y={yPositions[idx]}
            height={yScale(datum.value)}
            width={width}
            fill={colorFn(idx)}
          />
        ))}
      </g>
    );
  }
}

export default Bar;
