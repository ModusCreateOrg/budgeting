import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BudgetGridRow from 'components/BudgetGridRow';

it('renders correctly', () => {
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

  const tree = renderer.create(
    <Router>
      <BudgetGridRow url={'#'} transaction={mockTransaction} categories={mockCategories} />
    </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
