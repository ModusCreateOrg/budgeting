import React from 'react';
import renderer from 'react-test-renderer';
import ReportsPanel from '../';

// mock nested components
jest.mock('../ReportsTabbar', () => 'div');
jest.mock('react-router-dom');

it('renders correctly', () => {
  const tree = renderer.create(<ReportsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
