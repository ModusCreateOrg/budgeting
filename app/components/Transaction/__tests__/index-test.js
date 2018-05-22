import React from 'react';
import renderer from 'react-test-renderer';
import Transaction from 'components/Transaction';

// mock nested component
jest.mock('components/DonutChart', () => () => <div />);

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const balance = 423.34;

  const tree = renderer.create(<Transaction balance={balance} {...mockTransaction} />).toJSON();
  expect(tree).toMatchSnapshot();
});
