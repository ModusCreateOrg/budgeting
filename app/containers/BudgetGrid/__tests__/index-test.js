import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetGrid } from '../index';

// mock nested component
jest.mock('containers/EntryFormRow');

it('renders correctly', () => {
  const tree = renderer.create(<BudgetGrid />).toJSON();
  expect(tree).toMatchSnapshot();
});
