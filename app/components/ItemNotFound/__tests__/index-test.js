import React from 'react';
import renderer from 'react-test-renderer';
import ItemNotFound from 'components/ItemNotFound';

it('renders correctly', () => {
  const tree = renderer.create(<ItemNotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
