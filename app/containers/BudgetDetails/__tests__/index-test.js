import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetDetails } from '../index';

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

  const tree = renderer.create(<BudgetDetails id={1} categories={mockCategories} transaction={mockTransaction} totalInFlow={5000} totalOutFlow={-2000}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
