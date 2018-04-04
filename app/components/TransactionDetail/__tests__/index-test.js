import React from 'react';
import renderer from 'react-test-renderer';
import TransactionDetail from 'components/TransactionDetail';

it('renders correctly', () => {
  const mockTransactionDetail = {
    description: "Trader Joe's food",
    category: 'Groceries',
    percentage: '9.23 %',
    isPositive: false,
  };

  const tree = renderer.create(<TransactionDetail {...mockTransactionDetail} />).toJSON();
  expect(tree).toMatchSnapshot();
});
