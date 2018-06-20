import React from 'react';
import renderer from 'react-test-renderer';
import BudgetPercentage from '../';

// mock nested components
jest.mock('../../DonutChart', () => 'div');

it('renders correctly', () => {
  const mockData = {
       description : "one",
    value : 40,
    id : 1
 };

  const tree = renderer
    .create(<BudgetPercentage transaction={mockData} inflows={100} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
