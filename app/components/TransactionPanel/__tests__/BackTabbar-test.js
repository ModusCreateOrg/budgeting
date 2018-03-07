import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import BackTabbar from '../BackTabbar';

// mock nested components
jest.mock('components/NavLink', () => () => <div />);

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <BackTabbar />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
