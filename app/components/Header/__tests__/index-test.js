import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../';

// mock nested components
jest.mock('components/NavLink', () => () => <div />);
jest.mock('components/GitHubButton', () => 'div');
jest.mock('../Logo', () => 'div');

it('renders correctly', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
