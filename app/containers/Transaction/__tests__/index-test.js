import React from 'react';
import renderer from 'react-test-renderer';
import { TransactionContainer } from '../index';

const getMockMatch = id => ({
  params: { id },
});
const mockHistory = {
  goBack() {},
};

const mockTransactions = [
  {
    id: 21,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  },
];
it('needs history to render', () => {
  const errorMsg = 'needs the history object to go back to the previous page';
  expect(() => renderer.create(<TransactionContainer match={getMockMatch('1')} />)).toThrow(errorMsg);
});
it('renders correctly with an existing id 21 without total balance', () => {
  const tree = renderer
    .create(<TransactionContainer match={getMockMatch(21)} history={mockHistory} transactions={mockTransactions} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly with an existing id 21 with a total budget', () => {
  const tree = renderer
    .create(
      <TransactionContainer
        match={getMockMatch(21)}
        history={mockHistory}
        transactions={mockTransactions}
        totalBudget={500}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly without an id', () => {
  const tree = renderer.create(<TransactionContainer match={getMockMatch()} history={mockHistory} />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly with a null id', () => {
  const tree = renderer.create(<TransactionContainer match={getMockMatch(null)} history={mockHistory} />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly with number id', () => {
  const tree = renderer.create(<TransactionContainer match={getMockMatch(1)} history={mockHistory} />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly with string id', () => {
  const tree = renderer.create(<TransactionContainer match={getMockMatch('1')} history={mockHistory} />).toJSON();
  expect(tree).toMatchSnapshot();
});
