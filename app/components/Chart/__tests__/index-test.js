import React from 'react';
import renderer from 'react-test-renderer';
import Chart from '../';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Chart width={100} height={100}>
        test
      </Chart>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
