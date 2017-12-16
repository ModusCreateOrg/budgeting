import React from 'react';
import renderer from 'react-test-renderer';
import { MaybeBudgetItem as BudgetItem, mapStateToProps } from '../index';

jest.mock('components/DonutChart', () => 'DonutChart');
jest.mock('react-router-dom', () => ({ Link: props => <div className="RRLink" {...props} /> }));

it('renders inflow transaction', () => {
  const transaction = { value: 100, description: 'test' };
  const total = 500;
  const tree = renderer.create(<BudgetItem item={{ transaction, total }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders outflow transaction', () => {
  const transaction = { value: -100, description: 'test' };
  const total = -500;
  const tree = renderer.create(<BudgetItem item={{ transaction, total }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders non existent transaction', () => {
  const tree = renderer.create(<BudgetItem item={null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

const t1 = { id: 1, value: 100, description: 'test #1' };
const t2 = { id: 2, value: -400, description: 'test #2' };
const t3 = { id: 3, value: 400, description: 'test #2' };
const state = { transactions: [t1, t2, t3] };

it('takes the proper transaction by id', () => {
  expect(mapStateToProps(state, { id: '1' })).toEqual({
    item: { transaction: t1, total: t1.value + t3.value },
  });
});

it('uses null if transaction is not found', () => {
  expect(mapStateToProps(state, { id: '4' })).toEqual({
    item: null,
  });

  expect(mapStateToProps(state, { id: '1some' })).toEqual({
    item: null,
  });

  expect(mapStateToProps(state, { id: 'some' })).toEqual({
    item: null,
  });
});
