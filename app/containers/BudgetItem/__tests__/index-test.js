import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { BudgetItemContainer } from '../index';

// mock nested component
jest.mock('components/BudgetItemDetail', () => 'MockBudgetItemDetail');

function setup() {
  const props = {
    id: 1,
    transaction: {
      id: 1,
      description: 'Mock testing description',
      value: 33.33,
    },
    balance: 100,
  };
  const enzymeWrapper = shallow(<BudgetItemContainer {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

it('renders correctly', () => {
  const { props } = setup();
  const tree = renderer
    .create(
      <MemoryRouter initialEntries={['/budget/1']}>
        <BudgetItemContainer {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render a back button and the BudgetItemDetail component', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('MockBudgetItemDetail').exists()).toBe(true);
  expect(enzymeWrapper.find('Link').exists()).toBe(true);
});
