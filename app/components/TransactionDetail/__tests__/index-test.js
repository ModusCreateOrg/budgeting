import React from 'react';
import renderer from 'react-test-renderer';
import TransactionDetail from 'components/TransactionDetail';

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const tree = renderer.create(<TransactionDetail transaction={mockTransaction} />).toJSON();
  expect(tree).toMatchSnapshot();
});
