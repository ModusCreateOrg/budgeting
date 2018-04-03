import React from 'react';
import render from 'react-test-renderer';
import TransactionDetails from '../';

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };
  const mockPercentage = '30';

  const tree = render.create(<TransactionDetails transaction={mockTransaction} percentage={mockPercentage} />).toJSON();
  expect(tree).toMatchSnapshot();
});
