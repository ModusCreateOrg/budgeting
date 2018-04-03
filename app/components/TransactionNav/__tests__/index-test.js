import React from 'react';
import render from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import TransactionNav from '../';

it('renders correctly', () => {
  const tree = render
    .create(
      <Router>
        <TransactionNav />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
