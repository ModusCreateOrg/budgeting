import React from 'react';
import renderer from 'react-test-renderer';
import LegendItem from '../LegendItem';

it('renders correctly', () => {
  const tree = renderer.create(<LegendItem color="test" value={3} label="test" />).toJSON();
  expect(tree).toMatchSnapshot();

  window.requestAnimationFrame(() => 'wow');
});
