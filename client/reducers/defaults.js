export const defaultTransactions = [
  {
    id: 1,
    description: 'Trader Joe\'s food',
    value: -123.34
  },
  {
    id: 2,
    description: 'Gas',
    value: -64.73
  },
  {
    id: 3,
    description: 'Ebay sale - guitar',
    value: 102.00
  }
];
export const defaultTransactionGridFields = [
  {
    name: 'Description',
    className: 'flex',
    mapping: 'description'
  },
  {
    name: 'Value',
    className: 'align-right',
    mapping: 'value'
  }
];

export const defaultSummary = {
  description: 'Balance'
};
