import React from 'react';
import renderer from 'react-test-renderer';
import BudgetItemDetails from '../';

// mock nested component
jest.mock('components/PieChart');

it('renders correctly when transaction exists with negative value', () => {
  const transaction = { value: -10, description: 'simple transaction with negative value', categoryId: 1 };
  const tree = renderer
    .create(<BudgetItemDetails transaction={transaction} inflowBalance={100} outflowBalance={50} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when transaction exists with positive value', () => {
  const transaction = { value: 10, description: 'simple transaction with positive value', categoryId: 1 };
  const tree = renderer
    .create(<BudgetItemDetails transaction={transaction} inflowBalance={100} outflowBalance={50} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when transaction does not exists', () => {
  const tree = renderer.create(<BudgetItemDetails />).toJSON();
  expect(tree).toMatchSnapshot();
});
