import React from 'react';
import renderer from 'react-test-renderer';
import Legend from '../';

// mock nested components
jest.mock('../LegendItem', () => 'div');

it('renders correctly', () => {
  const mockData = [{ key: 1 }, { key: 2 }];

  const tree = renderer
    .create(<Legend data={mockData} dataValue="test" dataLabel="test" dataKey="key" color={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
