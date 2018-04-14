import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter as Router } from 'react-router-dom';
import TransactionDetail from 'components/TransactionDetail';

it('renders correctly', () => {
  // test props for the Detail component
  const detailProps = {
    description: "Trader Joe's food",
    category: 'Groceries',
    value: 423.34,
    difference: 4164.73,
    percentage: '- 9.23 %',
    isInflow: false,
  };
  // Router context is necessary because of the presence of Link components
  const tree = renderer.create(
    <Router context={{}}>
      <TransactionDetail {...detailProps} />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
