import React from 'react';
import renderer from 'react-test-renderer';
import DonutChart from 'components/DonutChart';

it('renders correctly', () => {
  const mockTransaction = {
    totalBudget: 4588.07,
    value: 1100,
    flow: 'Outflow',
    description: 'The usual weekly run',
  };
  const mockDataLabel = 'label';
  const mockDataKey = 'key';
  const mockData = [
    {
      key: 0,
      categoryId: '0',
      value: mockTransaction.totalBudget - mockTransaction.value,
      label: `${mockTransaction.flow} Budget`,
    },
    {
      key: 1,
      categoryId: '1',
      value: mockTransaction.value,
      label: `${mockTransaction.description}`,
    },
  ];

  const tree = renderer.create(<DonutChart dataLabel={mockDataLabel} dataKey={mockDataKey} data={mockData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
