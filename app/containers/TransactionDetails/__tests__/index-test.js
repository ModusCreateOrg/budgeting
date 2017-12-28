import React from 'react';
import renderer from 'react-test-renderer';
import { TransactionDetails } from '../index';

// mock nested component
jest.mock('components/PieChart');

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: '1',
  };

  const tree = renderer.create(<TransactionDetails transaction={mockTransaction} />).toJSON();
  expect(tree).toMatchSnapshot();
});
