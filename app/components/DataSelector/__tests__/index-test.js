import React from 'react';
import renderer from 'react-test-renderer';
import DataSelector from '../';

it('renders correctly', () => {
  const tree = renderer
    .create(<DataSelector data={{ foo: 'foo', bar: 'bar' }} value="test" onChange={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
