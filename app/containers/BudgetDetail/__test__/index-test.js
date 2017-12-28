import React from 'react';
import renderer from 'react-test-renderer';
import BudgetDetail from '../';

jest.mock('components/PieChart');

it('renders correctly', () => {
  const tree = renderer
    .create(
      <BudgetDetail.WrappedComponent
        percentage={0.5}
        inflowRemaining={200}
        outflowRemaining={200}
        transaction={{
          id: 1,
          value: 100,
        }}
        category="Misc"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
