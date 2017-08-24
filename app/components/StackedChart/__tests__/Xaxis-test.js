import React from 'react';
import renderer from 'react-test-renderer';
import Xaxis from '../Xaxis';

it('renders correctly', () => {
  const tree = renderer.create(<Xaxis data={{}} totals={{}} xScale={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
