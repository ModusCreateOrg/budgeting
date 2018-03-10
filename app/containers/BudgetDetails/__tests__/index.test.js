import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetDetails, mapStateToProps } from '../';
import { categoriesById, defaultTransactions } from 'modules/defaults';

// mock nested component
jest.mock('components/DonutChart');

it('mapStateToProps should return empty object if params not found', () => {
  const mockState = {
    categories: { ...categoriesById },
    transactions: defaultTransactions.slice()
  };
  const mockProps = {
    match: {}
  };
  const finalProps = {
    selectedTransaction: '',
    transactions: defaultTransactions.slice()
  };

  expect(mapStateToProps(mockState, mockProps)).toEqual(finalProps)
});

it ('should render', () => {
  const mockTransactions = defaultTransactions.slice();
  const mockTransaction = mockTransactions[0]

  const tree = renderer.create(
    <BudgetDetails
      transactions={mockTransactions}
      selectedTransaction={mockTransaction}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();

});
