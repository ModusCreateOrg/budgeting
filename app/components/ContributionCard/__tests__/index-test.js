import React from 'react';
import renderer from 'react-test-renderer';
import { getTransactionContributionById } from 'selectors/transactions';
import ContributionCard from '../';

jest.mock('components/DonutChart', () => 'DonutChart');

const transaction = {
  id: 1,
  categoryId: 1,
  description: 'Test transaction',
  value: 1000,
};

const mockState = {
  transactions: [transaction],
};

const mockContribution = getTransactionContributionById(mockState, 1);

it('renders correctly', () => {
  const tree = renderer.create(<ContributionCard contribution={mockContribution} />).toJSON();
  expect(tree).toMatchSnapshot();
});
