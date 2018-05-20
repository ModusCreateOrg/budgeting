import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BudgetItemDetail from 'components/BudgetItemDetail';
import styles from '../style.scss';

jest.mock('components/PieChart/Path');
jest.mock('components/PieChart', () => 'MockPieChart');

function setup(isOutflow = false) {
  const transaction = {
    id: 1,
    categoryId: 1,
    description: 'Mock testing description',
    value: isOutflow ? -33.33 : 33.33,
  };

  const balance = isOutflow ? -100 : 100;

  const props = {
    transaction,
    balance,
  };
  const enzymeWrapper = shallow(<BudgetItemDetail {...props} />);

  return {
    enzymeWrapper,
    props,
  };
}

it('renders correctly', () => {
  const { props } = setup();
  const tree = renderer.create(<BudgetItemDetail {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render title and subtitle', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('h1').text()).toBe('Mock testing description');
  expect(enzymeWrapper.find('h2').exists()).toBe(true);
});

it('should render subtitle percentage, sign and color correctly', () => {
  const inflowWrapper = setup().enzymeWrapper;
  expect(inflowWrapper.find('h2').text()).toBe('+33.33%');
  expect(
    inflowWrapper
      .find('h2')
      .find('span')
      .hasClass(styles.income)
  ).toBe(true);

  const outflowWrapper = setup(true).enzymeWrapper;
  expect(outflowWrapper.find('h2').text()).toBe('-33.33%');
  expect(
    outflowWrapper
      .find('h2')
      .find('span')
      .hasClass(styles.outcome)
  ).toBe(true);
});

it('should render a Pie Chart component', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('MockPieChart').exists()).toBe(true);
});
