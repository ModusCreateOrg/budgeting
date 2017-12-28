import React from 'react';
import renderer from 'react-test-renderer';
import BudgetDetails from 'components/BudgetDetails';

it('renders correctly', () => {
  const props = {
    itemPercentage: '50',
    itemValue: '500',
    itemTitle: 'Test',
    isOutflow: true,
    total: 1000,
    goBack: () => console.log(),
  };

  const tree = renderer.create(<BudgetDetails {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
