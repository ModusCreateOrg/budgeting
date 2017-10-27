import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { TransactionPage } from '../index';

// mock nested component
jest.mock('containers/TransactionDetails');

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: '1',
  };

  const tree = renderer
    .create(
      <MemoryRouter>
        <TransactionPage transaction={mockTransaction} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`renders with message 'transaction not found' if transaction is 'undefined'`, () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <TransactionPage />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
