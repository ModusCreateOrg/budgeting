// @flow
import * as React from 'react';
import PieChart from 'react-simple-pie-chart';
import LegendItem from 'components/Legend/LegendItem';
import { getRandomHex } from 'utils/random';

export interface PercentPieSlice {
  name: string,
  value: number,
  color?: string,
}

type PercentPieChartProps = {
  slices: PercentPieSlice[],
};

class PercentPieChart extends React.Component<PercentPieChartProps> {
  checkColors = slices =>
    slices.map(slice => {
      const el = { ...slice };
      if (!el.color) {
        el.color = getRandomHex();
      }
      return el;
    });

  render() {
    const { slices } = this.props;
    if (!slices.length) {
      return null;
    }
    const pieData = this.checkColors(slices);

    return (
      <div>
        <PieChart slices={pieData} />
        <ul>
          {pieData.map((data: PercentPieSlice): LegendItem => (
            <LegendItem key={`${data.name}-${data.color}`} color={data.color} label={data.name} value={data.value} />
          ))}
        </ul>
      </div>
    );
  }
}

export default PercentPieChart;
