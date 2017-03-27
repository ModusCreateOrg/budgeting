export const categoriesById = {
  1: 'Groceries',
  2: 'School',
  3: 'Entertainment',
  4: 'Utensils',
  5: 'Kids',
  6: 'Travel',
  7: 'Commute',
  8: 'Insurance',
  9: 'Clothing',
  10: 'Car',
  11: 'Taxes',
  12: 'Health',
  13: 'Home',
  14: 'Beauty',
  15: 'Income',
  16: 'Misc',
  17: 'Gifting'
};

export const DEFAULT_CATEGORY_ID = '16';

export const defaultTransactions = [
  {
    id: 1,
    description: 'Trader Joe\'s food',
    value: -123.34,
    categoryId: 1
  },
  {
    id: 2,
    description: 'Gas',
    value: -64.73,
    categoryId: 6
  },
  {
    id: 3,
    description: 'Ebay sale - guitar',
    value: 102.00,
    categoryId: 16
  },
  {
    id: 4,
    description: 'Milk & Eggs for the pancake party with neighbors',
    value: -12300,
    categoryId: 3
  },
  {
    id: 5,
    description: 'The usual weekly run',
    value: -32100,
    categoryId: 16
  },
  {
    id: 6,
    description: 'Paycheck',
    value: 297000,
    categoryId: 15
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
