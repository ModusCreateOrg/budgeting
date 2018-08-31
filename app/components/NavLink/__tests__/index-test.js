import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import NavLink from '..';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <NavLink to="test" label="test" styles={{}} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
