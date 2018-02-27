import React from 'react';
import renderer from 'react-test-renderer';
import BudgetContentSubtitle from 'components/BudgetContentSubtitle';

it('renders correctly', () => {
  const contributionPercentage = {
    value: 100,
    contribution: 10,
  };

  const tree = renderer.create(<BudgetContentSubtitle contributionPercentage={contributionPercentage} />).toJSON();
  expect(tree).toMatchSnapshot();
});
