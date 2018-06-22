import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { BudgetItem } from '../';

// mock nested component
jest.mock('components/DonutChart');

describe('BudgetItem', () => {
  const props = {
    transactions: [
      { id: 1, description: 'toiletries', categoryId: '20', value: 20 },
      { id: 2, description: 'drinks', categoryId: '10', value: -10 },
    ],
    match: { params: { id: '1' } },
    totalBudget: 30,
    history: { goBack: jest.fn() },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing', () => {
    const tree = renderer.create(<BudgetItem match={props.match} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders react element', () => {
    const tree = renderer.create(<BudgetItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should go back to previous page', () => {
    const newProps = { ...props, match: { params: { id: '2' } } };
    const component = shallow(<BudgetItem {...newProps} />);

    component.find('button[children="Go Back"]').simulate('click');

    expect(newProps.history.goBack).toHaveBeenCalled();
  });

  describe('getTransactionAndChartData', () => {
    it('should fetch new data and update state when id param changes', () => {
      const component = shallow(<BudgetItem {...props} />);
      const oldState = component.instance().state;
      const match = { params: { id: '2' } };

      component.setProps({ match });

      expect(component.instance().state).not.toEqual(oldState);
    });

    it('should get transaction and chart data on `componentWillMount`', () => {
      const spy = jest.spyOn(BudgetItem.prototype, 'getTransactionAndChartData');
      const component = shallow(<BudgetItem {...props} />);

      expect(spy).toHaveBeenCalled();
    });
  });
});
