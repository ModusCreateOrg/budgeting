import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TransactionDetail from '../index';

it('it renders correctly', () => {
  const transaction = renderer.create(
    <Router>
      <TransactionDetail value={1000} title={'Pay Bills'} total={15000} infolow={8000} outflow={7000}/>
    </Router >
  ).toJSON();
  expect(transaction).toMatchSnapshot();
});
