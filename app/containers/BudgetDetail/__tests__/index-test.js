import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { BudgetDetail } from '../index';

const mockTransactions = [
  {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  },
];

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <BudgetDetail match={{ params: { id: 1 } }} transactions={mockTransactions} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
