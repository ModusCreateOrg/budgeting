import React from 'react';
import { StaticRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { TransactionDetails } from '../index';

// mock nested component
jest.mock('components/DonutChart');

const mockOutflow = {
  transaction: {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  },
  categories: {
    1: 'Groceries',
    2: 'School',
  },
  totalBalance: 4588.07,
  isPositive: false,
};

it('renders correctly - outflow', () => {
  const tree = renderer
    .create(
      <StaticRouter context={{}}>
        <TransactionDetails {...mockOutflow} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const mockInflow = {
  transaction: {
    id: 3,
    description: 'Ebay sale - guitar',
    value: 1102,
    categoryId: 1,
  },
  categories: {
    1: 'Groceries',
    15: 'Income',
  },
  totalBalance: 6802,
  isPositive: true,
};

it('renders correctly - inflow', () => {
  const tree = renderer
    .create(
      <StaticRouter context={{}}>
        <TransactionDetails {...mockInflow} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const invalidFlow = {
  transaction: {},
  categories: {
    1: 'Groceries',
  },
  totalBalance: 0,
  isPositive: true,
};

it('renders correctly - invalid', () => {
  const tree = renderer
    .create(
      <StaticRouter context={{}}>
        <TransactionDetails {...invalidFlow} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
