import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import transactionsReducer, { actions } from '../transactions';

// Mock 'defaults' dependency to define a custom 'inflowCategories' and 'defaultTransactions'
jest.mock('../defaults', () => ({
  inflowCategories: [2],
  defaultTransactions: [
    {
      id: 1,
      description: "Trader Joe's food",
      value: -423.34,
      categoryId: 1,
    },
  ],
}));

// Create mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions', () => {
  describe('addTransaction', () => {
    it('should create an action to add a transaction', async () => {
      const store = mockStore({ transactions: [] });

      const newTransaction = {
        description: "Trader Joe's food",
        value: 423.34,
        categoryId: 1,
      };

      const expectedActions = [
        {
          type: 'budget/transaction/ADD',
          transaction: {
            id: 0,
            description: "Trader Joe's food",
            value: -423.34,
            categoryId: 1,
          },
        },
      ];

      await store.dispatch(actions.addTransaction(newTransaction));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to add a transaction with the right ID', async () => {
      const store = mockStore({ transactions: [{ id: 5 }, { id: 3 }] });

      const newTransaction = {
        description: "Trader Joe's food",
        value: 423.34,
        categoryId: 1,
      };

      const expectedActions = [
        {
          type: 'budget/transaction/ADD',
          transaction: {
            // new transaction id should by 1 more than the largest one in store
            id: 6,
            description: "Trader Joe's food",
            value: -423.34,
            categoryId: 1,
          },
        },
      ];

      await store.dispatch(actions.addTransaction(newTransaction));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to add a transaction with the right value for inflow categories', async () => {
      const store = mockStore({ transactions: [] });

      const newTransaction = {
        description: "Trader Joe's food",
        value: 423.34,
        categoryId: 2,
      };

      const expectedActions = [
        {
          type: 'budget/transaction/ADD',
          transaction: {
            id: 0,
            description: "Trader Joe's food",
            // value should be positive because the transaction is in an inflow category
            value: 423.34,
            categoryId: 2,
          },
        },
      ];

      await store.dispatch(actions.addTransaction(newTransaction));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('deleteTransaction', () => {
    it('should create an action to delete a transaction', () => {
      const id = 1;
      const expectedAction = {
        type: 'budget/transaction/DELETE',
        id,
      };
      expect(actions.deleteTransaction(id)).toEqual(expectedAction);
    });
  });
});

describe('reducers', () => {
  describe('transactionsReducer', () => {
    it('should return the initial state', () => {
      expect(transactionsReducer(undefined, {})).toEqual([
        {
          id: 1,
          description: "Trader Joe's food",
          value: -423.34,
          categoryId: 1,
        },
      ]);
    });

    it('should handle addTransaction action', () => {
      // test with empty state
      expect(
        transactionsReducer([], {
          type: 'budget/transaction/ADD',
          transaction: {
            id: 0,
            description: "Trader Joe's food",
            value: -423.34,
            categoryId: 1,
          },
        })
      ).toEqual([
        {
          id: 0,
          description: "Trader Joe's food",
          value: -423.34,
          categoryId: 1,
        },
      ]);

      // test with non-empty state
      expect(
        transactionsReducer(
          [
            {
              id: 0,
              description: "Trader Joe's food",
              value: -423.34,
              categoryId: 1,
            },
          ],
          {
            type: 'budget/transaction/ADD',
            transaction: {
              id: 2,
              description: 'Gas',
              value: -764.73,
              categoryId: 6,
            },
          }
        )
      ).toEqual([
        {
          id: 0,
          description: "Trader Joe's food",
          value: -423.34,
          categoryId: 1,
        },
        {
          id: 2,
          description: 'Gas',
          value: -764.73,
          categoryId: 6,
        },
      ]);
    });

    it('should handle deleteTransaction action', () => {
      // test with empty state
      expect(
        transactionsReducer([], {
          type: 'budget/transaction/DELETE',
          id: 0,
        })
      ).toEqual([]);

      // test with non-empty state
      expect(
        transactionsReducer(
          [
            {
              id: 0,
              description: "Trader Joe's food",
              value: -423.34,
              categoryId: 1,
            },
            {
              id: 1,
              description: 'Gas',
              value: -764.73,
              categoryId: 6,
            },
          ],
          {
            type: 'budget/transaction/DELETE',
            id: 0,
          }
        )
      ).toEqual([
        {
          id: 1,
          description: 'Gas',
          value: -764.73,
          categoryId: 6,
        },
      ]);
    });
  });
});
