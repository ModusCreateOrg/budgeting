import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { BudgetItem, mapStateToProps } from '../index';

const getFakeTransaction = ({ id = 1, value = 1 } = {}) => ({
  id,
  category: 'category',
  categoryId: 'categoryId',
  description: 'A description',
  value,
});

jest.mock('components/DonutChart', () => 'DonutChart');

it('renders correctly', () => {
  const testProps = {
    percentage: 15,
    totalBudget: 100,
    transaction: getFakeTransaction(),
  };
  const component = renderer
    .create(
      <Router>
        <BudgetItem {...testProps} />
      </Router>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders a Donut Chart', () => {
  const testProps = {
    percentage: 15,
    totalBudget: 100,
    transaction: getFakeTransaction(),
  };

  const component = shallow(
    <Router>
      <BudgetItem {...testProps} />
    </Router>
  );
  // need to go deeper into the shallow rendering...
  const renderedInstance = component.shallow().shallow();
  const chart = renderedInstance.find('DonutChart');
  expect(chart).toHaveLength(1);
});

it('renders the percentage in green color when the item has a positive value', () => {
  const testProps = {
    percentage: 15,
    totalBudget: 100,
    transaction: getFakeTransaction({ value: 20 }),
  };

  const component = shallow(
    <Router>
      <BudgetItem {...testProps} />
    </Router>
  );
  // need to go deeper into the shallow rendering...
  const renderedInstance = component.shallow().shallow();
  const percentage = renderedInstance.find('.budgetItemSubTitle');
  expect(percentage.hasClass('pos')).toBe(true);
});

it('renders the percentage in red color when the item has a negative value', () => {
  const testProps = {
    percentage: 15,
    totalBudget: 100,
    transaction: getFakeTransaction({ value: -10 }),
  };

  const component = shallow(
    <Router>
      <BudgetItem {...testProps} />
    </Router>
  );
  // need to go deeper into the shallow rendering...
  const renderedInstance = component.shallow().shallow();
  const percentage = renderedInstance.find('.budgetItemSubTitle');
  expect(percentage.hasClass('neg')).toBe(true);
});

// mapStateToProps's tests
const fakeState = {
  transactions: [
    getFakeTransaction({ id: 1, value: 20 }),
    getFakeTransaction({ id: 2, value: 0 }),
    getFakeTransaction({ id: 3, value: -20 }),
  ],
};
const inflowBudget = 20;
const outflowBudget = -20;

it('gets the right transaction by id', () => {
  const result = mapStateToProps(fakeState, { id: 1 });
  expect(result.transaction).toEqual(fakeState.transactions[0]);
});

it('calculates the total inflow budget based on the state', () => {
  const result = mapStateToProps(fakeState, { id: 1 });
  expect(result.totalBudget).toEqual(inflowBudget);
});

it('calculates the total outflow budget based on the state', () => {
  const result = mapStateToProps(fakeState, { id: 3 });
  expect(result.totalBudget).toEqual(outflowBudget);
});
