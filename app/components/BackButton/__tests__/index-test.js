import React from 'react';
import renderer from 'react-test-renderer';
import BackButton from '../';
import { MemoryRouter as Router } from 'react-router-dom'

it('back button renders correctly', () => {
  const tree = renderer.create(
    <Router>
      <BackButton />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
