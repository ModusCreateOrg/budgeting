import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from '../';

it('renders correctly with the default props if no props are specified', () => {
  const tree = renderer.create(<PieChart/>).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly the size(100) passed in the props as width and height px values', () => {
  const tree = renderer.create(<PieChart size={100} />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly the percentToHightlight(5) passed in the props as the negative animation delay', () => {
  const tree = renderer.create(<PieChart percentToHightlight={5} />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly the percentToHightlight(5) and size(100)', () => {
  const tree = renderer.create(<PieChart percentToHightlight={5} size={400}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
