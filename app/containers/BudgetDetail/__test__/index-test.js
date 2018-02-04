import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetDetail } from '../index';

// mock nested component
jest.mock('containers/BudgetDetail');

it('renders correctly', () => {
  const tree = renderer.create(<BudgetDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});
