import React from 'react';
import renderer from 'react-test-renderer';
import Path from '../Path';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Path
        data={{
          startAngle: 3,
          endAngle: 4,
        }}
        fill="fill"
        arcFn={() => 'test'}
        animDuration={3}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
