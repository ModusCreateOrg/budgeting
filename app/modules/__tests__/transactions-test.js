import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import transactionsReducer, { getNextTransactionID, normalizeTransaction, actions } from '../transactions';

import { defaultTransactions, inflowCategories } from '../defaults';

// Mock default state
jest.mock('../defaults', () => ({
  inflowCategories: [2],
  defaultTransactions: [
    {
      id: 0,
      description: "Trader Joe's food",
      value: -423.34,
      categoryId: 1,
    },
  ],
}));

// Create mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Create reusable transaction data - can't be used in mock() above because Babel hoists Jest
const initialTransaction = {
  id: 0,
  description: "Trader Joe's food",
  value: -423.34,
  categoryId: 1,
};

const updatedInitialTransaction = {
  id: 0,
  description: "Trader Joe's food return",
  value: -123.45,
  categoryId: 2,
};

const inflowTransaction = {
  description: 'Inflow item',
  value: -234.56,
  categoryId: 2,
};

const normalizedInflowTransaction = {
  id: 1, // initial store has one transaction with id 1, so this will be 0 + 1
  description: 'Inflow item',
  value: 234.56, // will be a positive number since our mock's inflowCategories contains categoryId of 2
  categoryId: 2,
};

const outflowTransaction = {
  description: 'Outflow item',
  value: 123.45,
  categoryId: 1,
};

const normalizedOutflowTransaction = {
  id: 1, // initial store has one transaction with id 1, so this will be 0 + 1
  description: 'Outflow item',
  value: -123.45, // will be a negative number since our mock's inflowCategories contains categoryId of 2
  categoryId: 1,
};

describe('transactions module', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      inflowCategories,
      transactions: defaultTransactions,
    });
  });

  describe('helpers', () => {
    describe('getNextTransactionID', () => {
      it('should get the next transaction id', () => {
        expect(getNextTransactionID([])).toEqual(0);
        expect(getNextTransactionID([{ id: 5 }, { id: 3 }])).toEqual(6);
        expect(getNextTransactionID(store.getState().transactions)).toEqual(1);
      });
    });

    describe('normalizeTransaction', () => {
      it('should set value to positive when inflowCategories contains the categoryId, negative when it does not', () => {
        expect(normalizeTransaction(store.getState().transactions, inflowTransaction)).toEqual(
          normalizedInflowTransaction
        );
        expect(normalizeTransaction(store.getState().transactions, outflowTransaction)).toEqual(
          normalizedOutflowTransaction
        );
      });
    });
  });

  describe('actions', () => {
    describe('addTransaction', () => {
      it('should create an action to add a transaction with the correct ID', async () => {
        await store.dispatch(actions.addTransaction(inflowTransaction));
        expect(store.getActions()).toEqual([
          {
            type: 'budget/transaction/ADD',
            transaction: normalizedInflowTransaction,
          },
        ]);
      });
    });

    describe('deleteTransaction', () => {
      it('should create an action to delete a transaction', async () => {
        const id = 0;
        await store.dispatch(actions.deleteTransaction(id));
        expect(store.getActions()).toEqual([
          {
            type: 'budget/transaction/DELETE',
            id,
          },
        ]);
      });
    });

    describe('updateTransaction', () => {
      it('should create an action to update an existing transaction', async () => {
        const expectedActions = [
          {
            type: 'budget/transaction/UPDATE',
            transaction: outflowTransaction,
          },
        ];
        await store.dispatch(actions.updateTransaction(outflowTransaction));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('reducers', () => {
    describe('transactionsReducer', () => {
      it('should return the initial state', () => {
        expect(transactionsReducer(undefined, {})).toEqual([initialTransaction]);
      });

      describe('addTransaction action', () => {
        it('should add a transaction to empty state', () => {
          expect(
            transactionsReducer([], {
              type: 'budget/transaction/ADD',
              transaction: inflowTransaction,
            })
          ).toEqual([inflowTransaction]);
        });

        it('should add a transactions to non-empty state', () => {
          expect(
            transactionsReducer(store.getState().transactions, {
              type: 'budget/transaction/ADD',
              transaction: inflowTransaction,
            })
          ).toEqual([initialTransaction, inflowTransaction]);
        });
      });

      describe('deleteTransaction action', () => {
        it('should do nothing when empty state', () => {
          expect(
            transactionsReducer([], {
              type: 'budget/transaction/DELETE',
              id: 1,
            })
          ).toEqual([]);
        });

        it('should add delete a transaction from non-empty state', () => {
          expect(
            transactionsReducer([initialTransaction, normalizedInflowTransaction], {
              type: 'budget/transaction/DELETE',
              id: 0,
            })
          ).toEqual([normalizedInflowTransaction]);
        });
      });

      describe('updateTransaction action', () => {
        it('should update a specific transaction', async () => {
          // Confirm description, value and categoryId were updated.
          expect(
            transactionsReducer([initialTransaction, normalizedInflowTransaction], {
              type: 'budget/transaction/UPDATE',
              transaction: updatedInitialTransaction,
            })
          ).toEqual([
            {
              id: 0,
              description: "Trader Joe's food return",
              value: -123.45,
              categoryId: 2,
            },
            normalizedInflowTransaction,
          ]);
        });
      });
    });
  });
});
