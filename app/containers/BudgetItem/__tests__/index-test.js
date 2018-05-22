import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetItem } from '../index';

// mock nested component
jest.mock('components/BudgetItemDetails');

it('renders correctly', () => {
  const tree = renderer.create(<BudgetItem />).toJSON();
  expect(tree).toMatchSnapshot();
});
