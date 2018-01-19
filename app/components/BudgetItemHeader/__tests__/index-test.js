import React from 'react';
import renderer from 'react-test-renderer';
import BudgetItemHeader from 'components/BudgetItemHeader';

it('component renders acceptably for inflow', () => {
  const transaction = {
    id: 1,
    description: 'Paycheck',
    value: 5000,
    categoryId: 15,
  };

  const balance = 6500;

  const tree = renderer.create(<BudgetItemHeader transaction={transaction} balance={balance} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('component renders acceptably for outflow', () => {
  const transaction = {
    id: 4,
    description: 'Paycheck',
    value: -485,
    categoryId: 12,
  };

  const balance = 2300;

  const tree = renderer.create(<BudgetItemHeader transaction={transaction} balance={balance} />).toJSON();
  expect(tree).toMatchSnapshot();
});
