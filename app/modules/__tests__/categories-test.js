import categoriesReducer from '../categories';

// Mock 'defaults' dependency to define a custom 'categoriesById'
jest.mock('../defaults', () => ({
  categoriesById: {
    1: 'Groceries',
    2: 'School',
    3: 'Entertainment',
    4: 'Utensils',
  },
}));

describe('reducers', () => {
  describe('categoriesReducer', () => {
    it('should return the initial state', () => {
      expect(categoriesReducer(undefined, {})).toEqual({
        1: 'Groceries',
        2: 'School',
        3: 'Entertainment',
        4: 'Utensils',
      });
    });
  });
});
