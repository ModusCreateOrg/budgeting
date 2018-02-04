import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router, withRouter } from 'react-router';
import { BudgetDetail } from '../index';

// mock nested component
jest.mock('containers/BudgetDetail');

it('renders correctly', () => {
  const tree = renderer.create(<Router><BudgetDetail /></Router>)).toJSON();
  expect(tree).toMatchSnapshot();
});
