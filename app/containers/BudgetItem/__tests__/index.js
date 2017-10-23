import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetItem } from '../index';

// mock onTransaction store
const onTransaction = () => ({
  id: 1,
  description: "Trader Joe's food",
  value: -423.34,
  percentage: 20,
  isNegative: true,
});

it('renders correctly with Transaction information', () => {
  const tree = renderer.create(<BudgetItem id={1} onTransaction={() => onTransaction()} />).toJSON();
  expect(tree).toMatchSnapshot();
});
