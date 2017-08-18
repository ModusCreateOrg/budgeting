import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetGrid } from '../';

// mock nested component
jest.mock('components/EntryFormRow');

it('renders correctly', () => {
  const tree = renderer.create(<BudgetGrid />).toJSON();
  expect(tree).toMatchSnapshot();
});
