import React from 'react';
import renderer from 'react-test-renderer';
import ItemContainer from '../';

// mock nested components
jest.mock('containers/ItemPercentage', () => 'div');
jest.mock('react-router-dom');

it('renders correctly', () => {
  const tree = renderer.create(<ItemContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
