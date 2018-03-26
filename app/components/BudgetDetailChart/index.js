// @flow

import * as React from 'react';
import { scaleOrdinal } from 'd3';

import isPositive from '../../utils/isPositive';
import getPercentage from '../../utils/getPercentage';
import DonutChart from '../DonutChart';

type BudgetDetailChartProps = {
  amount: Number,
  totalInflow: Number,
  totalOutflow: Number,
  description: String,
};

const BudgetDetailChart = ({ amount, totalInflow, totalOutflow, description }: BudgetDetailChartProps) => {
  const isInflow = isPositive(amount);
  const percentage = isInflow ? getPercentage(amount, totalInflow) : getPercentage(amount, totalOutflow);
  const chartData = [
    {
      description,
      key: 0,
      value: percentage,
    },
    {
      description: isInflow ? 'Other Inflows' : 'Other Outflows',
      key: 1,
      value: Number((100 - percentage).toFixed(2)),
    },
  ];
  return (
    <DonutChart
      dataLabel={'description'}
      dataKey={'key'}
      data={chartData}
      formatLabel={false}
      color={scaleOrdinal(['#edc', '#ccc', '#ccc'])}
    />
  );
};

BudgetDetailChart.defaultProps = {
  amount: 1,
  totalInflow: 0,
  totalOutflow: 0,
  description: '',
};

export default BudgetDetailChart;
