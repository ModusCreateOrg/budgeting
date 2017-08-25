import React from 'react';
import renderer from 'react-test-renderer';
import Bar from '../Bar';

it('renders correctly', () => {
  const mockYScale = () => {};
  mockYScale.range = () => [];

  const tree = renderer
    .create(<Bar yScale={mockYScale} colorFn={() => {}} data={[]} transform="test" width={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
