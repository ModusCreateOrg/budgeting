import React from 'react';
import renderer from 'react-test-renderer';
import TransactionModal from 'components/TransactionModal';

jest.mock('containers/TransactionData', () => 'div');
jest.mock('react-router-dom');

it('renders correctly', () => {
  const tree = renderer
    .create(<TransactionModal match={{ params: { id: '4' } }} history={{ push: () => {} }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
