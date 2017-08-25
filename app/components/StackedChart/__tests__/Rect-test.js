import React from 'react';
import renderer from 'react-test-renderer';
import Rect from '../Rect';

jest.mock('d3');

it('renders correctly', () => {
  const tree = renderer.create(<Rect width={100} height={100} fill="test" y={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});
