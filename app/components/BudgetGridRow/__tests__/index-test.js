import React from 'react';
import renderer from 'react-test-renderer';
import BudgetGridRow from 'components/BudgetGridRow';
import { StaticRouter } from 'react-router';

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

  const component = renderer.create(
    <StaticRouter location="someLocation" context={context}>
      <BudgetGridRow transaction={mockTransaction} categories={mockCategories} />
    </StaticRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
