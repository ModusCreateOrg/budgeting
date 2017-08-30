import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../';

it('renders correctly', () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});
