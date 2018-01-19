import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Default, { BudgetItemSummary } from '../';

jest.mock('components/BudgetItemHeader', () => () => <div>BudgetItemHeader</div>);
jest.mock('components/PieChart', () => () => <div>PieChart</div>);

it('renders children correctly for outflow transaction', () => {
  const outflowTransaction = {
    id: 1,
    description: 'outflow transaction',
    value: -4500,
    categoryId: '16',
  };
  const outFlowBalance = 15000;
  const elem = renderer
    .create(<BudgetItemSummary transaction={outflowTransaction} balance={outFlowBalance} />)
    .toJSON();
  expect(elem).toMatchSnapshot();
});

it('renders children correctly for inflow transaction', () => {
  const inflowTransaction = {
    id: 1,
    description: 'inflow transaction',
    value: 5000,
    categoryId: '16',
  };
  const inflowBalance = 32000;

  const elem = renderer.create(<BudgetItemSummary transaction={inflowTransaction} balance={inflowBalance} />).toJSON();
  expect(elem).toMatchSnapshot();
});

it("dispatches 'goBack' callback when back button is clicked", () => {
  const inflowTransaction = {
    id: 1,
    description: 'inflow transaction',
    value: 5000,
    categoryId: '16',
  };
  const inflowBalance = 32000;

  const mockCallBack = jest.fn();

  const elem = shallow(
    <BudgetItemSummary transaction={inflowTransaction} balance={inflowBalance} goBack={mockCallBack} />
  );
  elem.find('button').simulate('click');
  expect(mockCallBack).toBeCalled();
});
