import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../';

it('renders correctly', () => {
  const tree = renderer.create(<NotFound title="Title" description="Description" />).toJSON();
  expect(tree).toMatchSnapshot();
});
