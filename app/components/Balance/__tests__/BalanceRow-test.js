import React from 'react';
import renderer from 'react-test-renderer';
import BalanceRow from '../BalanceRow';

it('renders correctly', () => {
  const tree = renderer.create(<BalanceRow>test</BalanceRow>).toJSON();
  expect(tree).toMatchSnapshot();
});
