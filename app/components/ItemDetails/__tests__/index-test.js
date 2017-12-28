import React from 'react';
import renderer from 'react-test-renderer';
import ItemDetails from 'components/ItemDetails';

jest.mock('components/DonutChart', () => 'div');

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: 'The usual weekly run',
    itemOperator: '-',
    percent: 23.98,
    value: 1100,
    categoryId: 1,
    totalBudget: 4588.07,
    flow: 'Outflow',
  };

  const tree = renderer.create(<ItemDetails transaction={mockTransaction} />).toJSON();
  expect(tree).toMatchSnapshot();
});
