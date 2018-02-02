import React from 'react';
import renderer from 'react-test-renderer';
import BudgetItemDetails from 'components/BudgetItemDetails';

jest.mock('components/DonutChart');

it('renders correctly', () => {
  const testInfo = {
    id: 1,
    title: "Trader Joe's food",
    percentage: 6.22,
    isNegative: true,
  };

  const testData = [
    {
      key: 'key-1',
      description: "Trader Joe's food",
      value: 423.34,
    },
    {
      key: 'key-total',
      description: 'Remaining Budget',
      value: 6378.66,
    },
  ];

  const tree = renderer.create(<BudgetItemDetails info={testInfo} data={testData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
