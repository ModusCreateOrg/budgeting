import React from 'react';
import renderer from 'react-test-renderer';
import Percentage from '../';

it('renders correctly', () => {
  const tree = renderer.create(<Percentage balance={100} value={10} />).toJSON();
  expect(tree).toMatchSnapshot();
});
