import React from 'react';
import renderer from 'react-test-renderer';
import DetailsView from '..';

it('renders correctly', () => {
  const tree = renderer.create(<DetailsView />).toJSON();
  expect(tree).toMatchSnapshot();
});
