import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from '../';

// mock nested components
jest.mock('components/Path');
jest.mock('components/Chart', () => 'div');

it('renders correctly', () => {
  const tree = renderer.create(<PieChart dataLabel="test" dataKey="test" data={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
