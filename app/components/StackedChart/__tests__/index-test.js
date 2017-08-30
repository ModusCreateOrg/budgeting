import React from 'react';
import renderer from 'react-test-renderer';
import StackedChart from '../';

jest.mock('components/Legend', () => 'div');
jest.mock('components/Chart', () => 'div');
jest.mock('../Bar', () => 'div');
jest.mock('../Xaxis', () => 'div');

it('renders correctly', () => {
  const mockData = { inflow: [], outflow: [] };
  const mockTotals = { inflow: 1, outflow: 1 };

  const tree = renderer
    .create(<StackedChart dataLabel="test" dataKey="test" data={mockData} totals={mockTotals} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
