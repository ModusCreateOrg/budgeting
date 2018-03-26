import React from 'react';
import { shallow } from 'enzyme';
import BudgetDetailSubtitle from '../index';

describe('BudgetDetailSubtitle', () => {
  const defaultProps = {
    amount: 20,
    totalInflow: 100,
    totalOutflow: -200,
  };
  const createWrapper = overridenProps => {
    const props = {
      ...defaultProps,
      ...overridenProps,
    };
    return shallow(<BudgetDetailSubtitle {...props} />);
  };
  it('should renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('should calculate the correct percentage for inflows', () => {
    const wrapper = createWrapper();
    const textDiv = wrapper.find('div').at(0);
    expect(textDiv.text()).toEqual('$20.00 (20% of total inflows)');
  });

  it('should calculate the correct percentage for outflows', () => {
    const wrapper = createWrapper({ amount: -20 });
    const textDiv = wrapper.find('div').at(0);
    expect(textDiv.text()).toEqual('-$20.00 (10% of total outflows)');
  });

  it('should add the correct style to inflows', () => {
    const wrapper = createWrapper();
    const textDiv = wrapper.find('div').at(0);
    expect(textDiv.hasClass('inflowDescription')).toBeTruthy();
  });

  it('should add the correct style to outflows', () => {
    const wrapper = createWrapper({ amount: -20 });
    const textDiv = wrapper.find('div').at(0);
    expect(textDiv.hasClass('outflowDescription')).toBeTruthy();
  });
});
