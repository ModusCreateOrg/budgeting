// @flow
import React from 'react';
import DonutChart from 'components/DonutChart';

type PieChartProps = {
  data: {},
  dataLabel: string,
  dataKey: string,
  dataValue: string,
  color: Function,
  height: number,
};

const PieChart = (props: PieChartProps) => <DonutChart innerRatio={-props.height} {...props} />;

PieChart.defaultProps = {
  height: 300,
};

export default PieChart;
