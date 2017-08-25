import React from 'react';
import renderer from 'react-test-renderer';
import ReportsTabbar from '../ReportsTabbar';

// mock nested components
jest.mock('components/NavLink', () => () => <div />);

it('renders correctly', () => {
  const tree = renderer.create(<ReportsTabbar />).toJSON();
  expect(tree).toMatchSnapshot();
});
