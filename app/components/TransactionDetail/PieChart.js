import React from 'react';
import { scaleOrdinal } from 'd3';
import DonutChart from 'components/DonutChart';

// Custom chart color scheme just for TransactionDetail component
const inflowColorScheme = ['#00D4B3', '#B6FAF0', '#B6FAF0'];
const outFlowColorScheme = ['#DC363B', '#F4595D', '#F5979A'];

// Get color for the text of percentage given if it is inFlow or outFlow
export const getTransactionColor = isInflow => (isInflow ? inflowColorScheme[0] : outFlowColorScheme[0]);

const renderPieChart = (description, value, difference, isInflow) => {
  const colorScheme = isInflow ? inflowColorScheme : outFlowColorScheme;
  const chartData = {
    data: [
      {
        id: 1,
        category: description,
        value,
      },
      {
        id: 2,
        category: 'Other',
        value: difference,
      },
    ],
    color: scaleOrdinal(colorScheme),
    innerRatio: 300, // Inner ratio to obtain a Pie Chart
  };
  return <DonutChart {...chartData} dataLabel="category" dataKey="id" />;
};

export default renderPieChart;
