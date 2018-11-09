import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { TransactionDetail } from '../index';

const mockTransaction = {
  id: 10,
  description: 'Testing transaction',
  value: -651.24,
  categoryId: 1,
};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <TransactionDetail currentTransaction={mockTransaction} totalInflow={4521.2} totalOutflow={521.2} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without a valid transaction', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <TransactionDetail />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
