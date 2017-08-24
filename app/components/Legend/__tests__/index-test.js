import React from 'react';
import renderer from 'react-test-renderer';
import Legend from '../';

// mock nested components
jest.mock('../LegendItem', () => 'div');

it('renders correctly', () => {
  const tree = renderer
    .create(<Legend data={['foo', 'bar']} dataValue="test" dataLabel="test" dataKey="test" color={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
