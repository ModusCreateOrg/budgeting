import React from 'react';
import renderer from 'react-test-renderer';
import TransactionOverview from '../';

it('renders correctly', () => {
  const transactionDesc = 'Paycheck';
  const transactionValue = 5000;
  const contributionPercent = 45;

  const tree = renderer.create(
    <TransactionOverview
      transactionDesc={transactionDesc}
      transactionValue={transactionValue}
      contributionPercent={contributionPercent}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
