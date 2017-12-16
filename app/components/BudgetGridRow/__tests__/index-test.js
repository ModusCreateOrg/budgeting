import React from 'react';
import renderer from 'react-test-renderer';
import BudgetGridRow from 'components/BudgetGridRow';

const mockTransaction = {
  id: 1,
  description: "Trader Joe's food",
  value: -423.34,
  categoryId: 1,
};

const mockCategories = {
  1: 'Groceries',
  2: 'School',
};

it('renders correctly', () => {
  const tree = renderer.create(<BudgetGridRow transaction={mockTransaction} categories={mockCategories} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders `cursor: pointer` when onClick is provided', () => {
  const tree = renderer
    .create(<BudgetGridRow transaction={mockTransaction} categories={mockCategories} onClick={() => undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
