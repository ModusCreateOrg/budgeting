import React from 'react';
import renderer from 'react-test-renderer';
import TransactionDetail from 'components/TransactionDetail';

it('needs a transaction to render', () => {
  expect(()=>renderer.create(<TransactionDetail />)).toThrow('a transaction is required');
  expect(()=>renderer.create(<TransactionDetail transaction={null}/>)).toThrow('a transaction is required');
});
it('needs a transaction value to render correctly', () => {
  const mockTransaction = {
    id: 1,
    description: 'Trader Joe\'s food',
    categoryId: 1
  };
  expect(()=>renderer.create(<TransactionDetail transaction={mockTransaction}/>)).toThrow('a transaction value is required');
});
it('renders correctly with a transaction', () => {
  const mockTransaction = {
    id: 1,
    description: 'Trader Joe\'s food',
    value: -423.34,
    categoryId: 1
  };

  const tree = renderer.create(<TransactionDetail transaction={mockTransaction} />).toJSON();
  expect(tree).toMatchSnapshot();
});
