import React from 'react';
import renderer from 'react-test-renderer';
import BalancePrefix from '../BalancePrefix';

it('renders correctly', () => {
  const tree = renderer.create(<BalancePrefix text="text" />).toJSON();
  expect(tree).toMatchSnapshot();
});
