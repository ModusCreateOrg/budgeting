import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { BudgetGrid } from '../index';

// mock nested component
jest.mock('containers/EntryFormRow');

const mockedTransactions = [
  {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: '1',
  },
];

const mockedCategories = {
  '1': 'Groceries',
  '2': 'School',
};

describe('BudgetGrid', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<BudgetGrid transactions={mockedTransactions} categories={mockedCategories} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should goto item contribution screen on row click', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
    };

    const instance = shallow(<BudgetGrid {...props} />).instance();
    instance.onRowClick(1);
    expect(props.history.push).toHaveBeenCalledWith('/item-contribution/1');
  });
});
