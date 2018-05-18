import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from '../';

it('renders correctly', () => {
  const chartData = [];
        let otherColor = "#000", transactionColor = "#22964e";
        chartData.push({title: "Other", value: 100-22.5, color: otherColor})
        chartData.push({title: "Income - Paycheck - $5,700.00", value: 22.5, color: transactionColor});
  const tree = renderer
    .create(
      <PieChart data={chartData}>
        test
      </PieChart>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
