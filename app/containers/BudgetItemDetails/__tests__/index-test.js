import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { BudgetItemDetails } from 'containers/BudgetItemDetails';

jest.mock('components/DonutChart/Path');
jest.mock('components/Legend', () => 'div');

it('renders correctly', () => {
  const mockTransactions = [
    {
      id: 1,
      description: "Trader Joe's food",
      value: -423.34,
      categoryId: 1,
    },
    {
      id: 2,
      description: 'More books :) And some long text to see if elipsis works',
      value: -623.34,
      categoryId: 2,
    },
  ];

  const mockCategories = {
    1: 'Groceries',
    2: 'School',
  };

  const mockRouterMatch = {
    path: '/item/:itemId',
    url: '/item/1',
    isExact: true,
    params: { itemId: '1' },
  };

  const mockRouterHistory = {
    goBack: jest.fn(),
  };

  const mockInflowBalance = 3456;
  const mockOutflowBalance = -2346;

  const tree = renderer
    .create(
      <BudgetItemDetails
        match={mockRouterMatch}
        history={mockRouterHistory}
        inflowBalance={mockInflowBalance}
        outflowBalance={mockOutflowBalance}
        transactions={mockTransactions}
        categories={mockCategories}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('correctly calls goBack on Back button click', () => {
  const mockTransactions = [
    {
      id: 1,
      description: "Trader Joe's food",
      value: -423.34,
      categoryId: 1,
    },
  ];

  const mockCategories = {
    1: 'Groceries',
    2: 'School',
  };

  const mockRouterMatch = {
    path: '/item/:itemId',
    url: '/item/1',
    isExact: true,
    params: { itemId: '1' },
  };

  const mockGoBack = jest.fn();

  const mockRouterHistory = {
    goBack: mockGoBack,
  };

  const mockInflowBalance = 3456;
  const mockOutflowBalance = -2346;

  const wrapper = shallow(
    <BudgetItemDetails
      match={mockRouterMatch}
      history={mockRouterHistory}
      inflowBalance={mockInflowBalance}
      outflowBalance={mockOutflowBalance}
      transactions={mockTransactions}
      categories={mockCategories}
    />
  );

  wrapper.find('.goBackButton').simulate('click');

  expect(mockGoBack).toHaveBeenCalled();
});
