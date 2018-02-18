import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetGridRow } from 'components/BudgetGridRow';
import { mount } from 'enzyme';

const mockTransaction = {
  id: 1,
  description: "Trader Joe's food",
  value: -423.34,
  categoryId: 1,
};

const mockCategories = {
  1: 'Groceries',
  2: 'School',
};

const mockContribution = '20.00%';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <table>
        <tbody>
          <BudgetGridRow transaction={mockTransaction} categories={mockCategories} share={mockContribution} />
        </tbody>
      </table>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('navigates without crashing', done => {
  const mockupHistory = {
    push: url => {
      expect(url).toEqual(`/budget/item-details/${mockTransaction.id}`);
      done();
    },
  };

  const component = mount(
    <table>
      <tbody>
        <BudgetGridRow
          transaction={mockTransaction}
          categories={mockCategories}
          share={mockContribution}
          history={mockupHistory}
        />
      </tbody>
    </table>
  );
  component.find('tr').simulate('click');
});
