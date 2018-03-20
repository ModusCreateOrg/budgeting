import React from 'react';
import renderer from 'react-test-renderer';
import BudgetDetailsChart from 'components/BudgetDetailsChart';

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const mockFlow = {
    inflow: 14000,
    outflow: -2000,
  };

  const tree = renderer.create(<BudgetDetailsChart transaction={mockTransaction} flow={mockFlow} />).toJSON();
  expect(tree).toMatchSnapshot();
});
