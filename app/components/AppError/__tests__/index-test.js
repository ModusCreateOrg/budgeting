import React from 'react';
import renderer from 'react-test-renderer';
import AppError from '../';

it('renders correctly', () => {
  const tree = renderer.create(<AppError />).toJSON();
  expect(tree).toMatchSnapshot();
});
