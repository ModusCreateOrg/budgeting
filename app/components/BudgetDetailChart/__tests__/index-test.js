import React from 'react';
import BudgetDetailChart from 'components/BudgetDetailChart';
import { shallow } from 'enzyme';

describe('BudgetDetailCard', () => {
  const defaultProps = {
    amount: 20,
    totalInflow: 100,
    totalOutflow: -200,
    description: 'test',
  };
  const createWrapper = overridenProps => {
    const props = {
      ...defaultProps,
      ...overridenProps,
    };
    return shallow(<BudgetDetailChart {...props} />);
  };
  it('should renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('should calculate the correct percentage for inflows', () => {
    const wrapper = createWrapper();
    const chart = wrapper.find('DonutChart').at(0);
    expect(chart.prop('data')).toEqual([
      {
        description: 'test',
        key: 0,
        value: 20,
      },
      {
        description: 'Other Inflows',
        key: 1,
        value: 80,
      },
    ]);
  });

  it('should calculate the correct percentage for outflows', () => {
    const wrapper = createWrapper({ amount: -20 });
    const chart = wrapper.find('DonutChart').at(0);
    expect(chart.prop('data')).toEqual([
      {
        description: 'test',
        key: 0,
        value: 10,
      },
      {
        description: 'Other Outflows',
        key: 1,
        value: 90,
      },
    ]);
  });
});
