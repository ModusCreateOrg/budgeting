// @flow

export const categoriesById: { [key: string]: string } = {
  '1': 'Groceries',
  '2': 'School',
  '3': 'Entertainment',
  '4': 'Utensils',
  '5': 'Kids',
  '6': 'Travel',
  '7': 'Commute',
  '8': 'Insurance',
  '9': 'Clothing',
  '10': 'Car',
  '11': 'Taxes',
  '12': 'Health',
  '13': 'Home',
  '14': 'Beauty',
  '15': 'Income',
  '16': 'Misc',
  '17': 'Gifting',
};

export const inflowCategories: Array<string> = ['15'];

export const defaultTransactions = [
  {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: '1',
  },
  {
    id: 2,
    description: 'Gas',
    value: -764.73,
    categoryId: '6',
  },
  {
    id: 3,
    description: 'Ebay sale - guitar',
    value: 1102.0,
    categoryId: '15',
  },
  {
    id: 4,
    description: 'Milk & Eggs for the pancake party with neighbors',
    value: -2300,
    categoryId: '3',
  },
  {
    id: 5,
    description: 'The usual weekly run',
    value: -1100,
    categoryId: '16',
  },
  {
    id: 6,
    description: 'Paycheck',
    value: 5700,
    categoryId: '15',
  },
];
