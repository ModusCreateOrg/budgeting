// @flow
import { defaultTransactions, inflowCategories } from './defaults';

/**
 * Action Constants
 */
const ADD_TRANSACTION = 'budget/transaction/ADD';
const DELETE_TRANSACTION = 'budget/transaction/DELETE';

export type Transaction = {
  +id: number,
  +categoryId: string,
  +description: string,
  +value: number,
};

/**
 * Helpers
 */
function getNextTransactionID(state) {
  return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// Add a new transaction.
function normalizeTransaction(state, { categoryId, description, value }): Transaction {
  const realValue = inflowCategories.includes(categoryId) ? Math.abs(value) : Math.abs(value) * -1;

  return {
    id: getNextTransactionID(state),
    categoryId,
    description,
    value: realValue,
  };
}

/**
 * Actions
 */
export const actions = {
  addTransaction: (transaction: Transaction) => (dispatch: Function, getState: Function) =>
    dispatch({
      type: ADD_TRANSACTION,
      transaction: normalizeTransaction(getState().transactions, transaction),
    }),

  deleteTransaction: (id: $PropertyType<Transaction, 'id'>) => ({
    type: DELETE_TRANSACTION,
    id,
  }),
};

/**
 * Reducer
 */
export default function transactionsReducer(state: Transaction[] = defaultTransactions, action: Object) {
  let newState;

  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, ...action.transaction];

    case DELETE_TRANSACTION:
      newState = state.filter(todo => todo.id !== action.id);
      return newState;

    default:
      return state;
  }
}
