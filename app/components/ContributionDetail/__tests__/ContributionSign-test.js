import React from 'react';
import renderer from 'react-test-renderer';
import ContributionSign from '../ContributionSign';

it('renders correctly', () => {
  const mockValue = 100;
  const tree = renderer.create(<ContributionSign value={mockValue} />).toJSON();
  expect(tree).toMatchSnapshot();
});
