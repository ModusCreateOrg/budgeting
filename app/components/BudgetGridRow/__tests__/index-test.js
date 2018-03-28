import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';
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

  const context = {};
  const tree = renderer
    .create(
      <StaticRouter context={context}>
        <BudgetGridRow transaction={mockTransaction} categories={mockCategories} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
