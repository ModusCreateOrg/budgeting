import React from 'react';
import renderer from 'react-test-renderer';
import ItemBudgetDetail from 'components/ItemBudgetDetail';

jest.mock('components/DonutChart', () => 'div');

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };
  const mockBudget = 2500;

  const tree = renderer.create(<ItemBudgetDetail transaction={mockTransaction} totalBudget={mockBudget} />).toJSON();
  expect(tree).toMatchSnapshot();
});
