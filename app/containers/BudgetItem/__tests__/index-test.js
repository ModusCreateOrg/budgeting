import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetItem } from '../index';

jest.mock('components/DonutChart/Path');
jest.mock('components/Chart', () => 'div');
jest.mock('components/Legend', () => 'div');

it('renders correctly', () => {
  const testTransactions = [
    {
      id: 1,
      description: "Trader Joe's food",
      value: -423.34,
      categoryId: '1',
    },
    {
      id: 2,
      description: 'Gas',
      value: -764.73,
      categoryId: '6',
    },
    {
      id: 3,
      description: 'Ebay sale - guitar',
      value: 1102.0,
      categoryId: '15',
    },
    {
      id: 4,
      description: 'Milk & Eggs for the pancake party with neighbors',
      value: -2300,
      categoryId: '3',
    },
    {
      id: 5,
      description: 'The usual weekly run',
      value: -1100,
      categoryId: '16',
    },
    {
      id: 6,
      description: 'Paycheck',
      value: 5700,
      categoryId: '15',
    },
  ];
  const tree = renderer.create(<BudgetItem id={1} transactions={testTransactions} />).toJSON();
  expect(tree).toMatchSnapshot();
});
