import store from 'store';
import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import Transaction from '../';

it('renders error', () => {
  const tree = render
    .create(
      <Provider store={store}>
        <Router>
          <Transaction />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
