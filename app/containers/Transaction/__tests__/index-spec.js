import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import Transaction from '../';

jest.mock('containers/TransactionDetails');

it('renders with transaction', () => {
  const tree = renderer
    .create(
      <StaticRouter location="transaction" context={{}}>
        <Transaction.WrappedComponent
          transaction={{
            id: 1,
          }}
          transactionId="1"
        />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders not found', () => {
  const tree = renderer
    .create(
      <StaticRouter location="transaction" context={{}}>
        <Transaction.WrappedComponent transactionId="5" />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
