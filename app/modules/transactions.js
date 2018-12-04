// @flow
import { defaultTransactions, inflowCategories } from './defaults';

/**
 * Action Constants
 */
const ADD_TRANSACTION = 'budget/transaction/ADD';
const UPDATE_TRANSACTION = 'budget/transaction/UPDATE';
const DELETE_TRANSACTION = 'budget/transaction/DELETE';

export type Transaction = {
  +id: number,
  +categoryId: string,
  +description: string,
  +value: number,
};

type UnindexedTransaction = {
  categoryId: string,
  description: string,
  value: number,
};

type IndexedTransaction = {
  id: string,
  categoryId: string,
  description: string,
  value: number,
};

type Action = {
  type: string,
  transaction: Transaction,
  id?: number,
};

/**
 * Helpers
 */
function getNextTransactionID(state: Transaction[]): number {
  return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// Add a new transaction.
function normalizeTransaction(
  state: Transaction[],
  { categoryId, description, value }: UnindexedTransaction
): Transaction {
  const realValue = inflowCategories.includes(categoryId) ? Math.abs(value) : Math.abs(value) * -1;

  return {
    id: getNextTransactionID(state),
    categoryId,
    description,
    value: realValue,
  };
}

// Add a new transaction.
function normalizeExistingTransaction({ id, categoryId, description, value }: IndexedTransaction): Transaction {
  const realValue = inflowCategories.includes(categoryId) ? Math.abs(value) : Math.abs(value) * -1;

  return {
    id,
    categoryId,
    description,
    value: realValue,
  };
}

/**
 * Actions
 */
export const actions = {
  addTransaction: (transaction: UnindexedTransaction) => (dispatch: Function, getState: Function) =>
    dispatch({
      type: ADD_TRANSACTION,
      transaction: normalizeTransaction(getState().transactions, transaction),
    }),

  updateTransaction: (transaction: IndexedTransaction) => (dispatch: Function) =>
    dispatch({
      type: UPDATE_TRANSACTION,
      transaction: normalizeExistingTransaction(transaction),
    }),

  deleteTransaction: (id: $PropertyType<Transaction, 'id'>) => ({
    type: DELETE_TRANSACTION,
    id,
  }),
};

/**
 * Reducer
 */
export default function transactionsReducer(state: Transaction[] = defaultTransactions, action: Action): Transaction[] {
  let newState;

  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action.transaction];

    case UPDATE_TRANSACTION:
      newState = state.map(
        transaction => (transaction.id === action.transaction.id ? action.transaction : transaction)
      );
      return newState;

    case DELETE_TRANSACTION:
      newState = state.filter(todo => todo.id !== action.id);
      return newState;

    default:
      return state;
  }
}
