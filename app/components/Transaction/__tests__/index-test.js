import React from 'react';
import renderer from 'react-test-renderer';
import Transaction from 'components/Transaction';

jest.mock('containers/TransactionData', () => 'div');
jest.mock('react-router-dom');

it('renders correctly', () => {
  const tree = renderer.create(<Transaction match={{ params: { id: '4' } }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
