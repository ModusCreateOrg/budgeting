import React from 'react';
import renderer from 'react-test-renderer';
import TransactionInfo from 'components/TransactionInfo';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const mockData = [{ id: 1, value: 200, label: "Trader Joe's food" }, { id: 2, value: 1000, label: 'Other expenses' }];

  const mockIsInflow = true;

  const mockPercentage = 50;

  const tree = renderer
    .create(
      <Router>
        <TransactionInfo
          transaction={mockTransaction}
          isInflow={mockIsInflow}
          percentage={mockPercentage}
          data={mockData}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
