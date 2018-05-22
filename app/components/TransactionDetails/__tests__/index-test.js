import React from 'react';
import renderer from 'react-test-renderer';
import TransactionDetails from 'components/TransactionDetails';


it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const mockRemainder = -4164.73;
  const mockPercent = 9.23;

  const mockData = [
        {id: mockTransaction.id, value: Math.abs(mockTransaction.value), description: mockTransaction.description},
        {id: -1 ,value: Math.abs(mockRemainder), description: "Other"}
      ]

  const mockHistory = {
    "length": 3,
    "action": "PUSH",
    "location": {
      "pathname": "/reports/item/4",
      "search": "",
      "hash": "",
      "key": "54iwis"
      }
  }

  const tree = renderer.create(
    <TransactionDetails data={mockData} transaction={mockTransaction} isNegative={true} percent={mockPercent} history={mockHistory}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
