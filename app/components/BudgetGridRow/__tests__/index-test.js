import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter as Router } from 'react-router-dom';
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
  // Router necessary because of the presence of Links
  const tree = renderer.create(
    <Router context={{}}>
      <BudgetGridRow transaction={mockTransaction} categories={mockCategories} />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
