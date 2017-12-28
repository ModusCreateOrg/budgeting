import React from 'react';
import renderer from 'react-test-renderer';
import BudgetItem from 'components/BudgetItem';

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const mockContribution = {
    flowTotal: 1000,
    percent: 20,
  };

  const mockClick = () => {};

  const tree = renderer
    .create(<BudgetItem transaction={mockTransaction} contribution={mockContribution} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
