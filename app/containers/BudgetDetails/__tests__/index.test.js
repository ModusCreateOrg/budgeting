import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetDetails } from '../';

// mock nested component
jest.mock('components/DonutChart');

it('renders correctly', () => {
  const mockTransaction = {
    catgeoryId: "6",
    description: "Gas",
    id: 2,
    value: -764.73
  };
  const mockTransactions = [mockTransaction];

  const tree = renderer.create(
    <BudgetDetails
      transactions={mockTransactions}
      selectedTransaction={mockTransaction}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
