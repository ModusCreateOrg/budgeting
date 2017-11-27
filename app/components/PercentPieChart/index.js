// @flow
import * as React from 'react';
import PieChart from 'react-simple-pie-chart';
import { getRandomHex } from 'utils/random';

type PercentPieChartProps = {
  values: number[],
  total: number,
};

class PercentPieChart extends React.Component<PercentPieChartProps> {
  getSlices = (values, total) => {
    const slices = values.map(value => ({
      color: getRandomHex(),
      value: this.getPercentage(value, total),
    }));
    const missingSlice = this.getMissingSlice(values, total);
    if (missingSlice) {
      slices.push(missingSlice);
    }
    return slices;
  };

  getMissingSlice = (values, total) => {
    const missingAmount = values.reduce((acc, x) => acc - x, total);
    if (missingAmount) {
      return {
        color: 'transparent',
        value: this.getPercentage(missingAmount, total),
      };
    }
    return null;
  };

  getPercentage = (value, total) => value / total;

  render() {
    const { values, total } = this.props;
    const slices = this.getSlices(values, total);
    if (!slices.length) {
      return null;
    }
    return <PieChart slices={slices} />;
  }
}

export default PercentPieChart;
