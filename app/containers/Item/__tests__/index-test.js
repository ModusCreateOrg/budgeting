import React from 'react';
import renderer from 'react-test-renderer';
import ItemHeader from '../itemHeader';

it('renders correctly', () => {
  const mockData = {
    description: "Trader Joe's food",
    inflowPercentage: 5.5,
    outflowPercentage: 2.5,
  };
  const tree = renderer
    .create(
      <ItemHeader name={mockData.description} inflow={mockData.inflowPercentage} outflow={mockData.outflowPercentage} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
