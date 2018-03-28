import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';
import TransactionDetail from 'components/TransactionDetail';

it('component renders correctly for inflow', () => {
  const mockTransaction = {
    id: 3,
    description: 'Ebay sale - guitar',
    value: 1102.0,
    categoryId: '15',
  };

  const mockBalance = 6802.0;

  const mockCategories = {
    15: 'Income',
  };

  const context = {};
  const tree = renderer
    .create(
      <StaticRouter context={context}>
        <TransactionDetail transaction={mockTransaction} balance={mockBalance} categories={mockCategories} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('component renders correctly for outflow', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: '1',
  };

  const mockBalance = 4588.07;

  const mockCategories = {
    1: 'Groceries',
  };

  const context = {};
  const tree = renderer
    .create(
      <StaticRouter context={context}>
        <TransactionDetail transaction={mockTransaction} balance={mockBalance} categories={mockCategories} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
