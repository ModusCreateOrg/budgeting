import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from '../';

it('renders correctly', () => {
  const tree = renderer.create(<PieChart dataLabel="test" dataKey="test" data={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
