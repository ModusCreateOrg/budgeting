import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../';
// mock nested components
jest.mock('components/NavLink', () => () => <div />);
jest.mock('components/GitHubButton', () => 'div');
jest.mock('../Logo', () => 'div');

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <Header />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
