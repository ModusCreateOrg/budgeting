import React from 'react';
import renderer from 'react-test-renderer';
import BudgetGridRow from 'components/BudgetGridRow';

jest.mock('react-router-dom');

it('renders correctly', () => {
  const mockTransactions = [
    {
      id: 1,
      description: "Trader Joe's food",
      value: -423.34,
      categoryId: 1,
    },
    {
      id: 2,
      description: 'Ebay sale - guitar',
      value: 1102,
      categoryId: 3,
    },
  ];

  const mockCategories = {
    1: 'Groceries',
    2: 'School',
    3: 'Income',
  };

  const tree = renderer
    .create(
      <BudgetGridRow transaction={mockTransactions[0]} categories={mockCategories} transactions={mockTransactions} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
