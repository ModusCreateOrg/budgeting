import React from 'react';
import renderer from 'react-test-renderer';
import DonutChart from '../';

// mock nested components
jest.mock('components/DonutChart/Path');
jest.mock('components/Chart', () => 'div');
jest.mock('components/Legend', () => 'div');

it('renders correctly', () => {
  const tree = renderer.create(<DonutChart dataLabel="test" dataKey="test" data={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
