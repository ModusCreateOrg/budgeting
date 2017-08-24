import React from 'react';
import renderer from 'react-test-renderer';
import NavLink from '../';

// mock nested components
jest.mock('react-router-dom');

it('renders correctly', () => {
  const tree = renderer.create(<NavLink to="test" label="test" styles={{}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
