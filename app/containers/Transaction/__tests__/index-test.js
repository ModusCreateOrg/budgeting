import React from 'react';
import renderer from 'react-test-renderer';
import { TransactionContainer } from '../index';

const mockMatch = {
  params: {id: null}
}
const mockHistory = {
  goBack(){}
}

it('renders correctly', () => {
  const tree = renderer.create(<TransactionContainer match={mockMatch} history={mockHistory} />).toJSON();
  expect(tree).toMatchSnapshot();
});
