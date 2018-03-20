import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetDetailsContainer } from '../index';

it('renders an error message if an invalid ID is passed', () => {
  const budgetDetails = renderer.create(<BudgetDetailsContainer />).toJSON();
  expect(budgetDetails).toMatchSnapshot();
});
