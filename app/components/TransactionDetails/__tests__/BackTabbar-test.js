import React from 'react';
import renderer from 'react-test-renderer';
import BackTabbar from '../BackTabbar';

// mock nested components
jest.mock('components/NavLink', () => () => <div />);

it('renders correctly', () => {
  const tree = renderer.create(<BackTabbar />).toJSON();
  expect(tree).toMatchSnapshot();
});
