import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from '../';

jest.mock('components/DonutChart/Path');
jest.mock('components/Chart', () => 'div');
jest.mock('components/Legend', () => 'div');

it('renders correctly', () => {
  const component = renderer.create(<PieChart dataLabel="pieChart" dataKey="pieKey" data={[]} />).toJSON();
  expect(component).toMatchSnapshot();
});
