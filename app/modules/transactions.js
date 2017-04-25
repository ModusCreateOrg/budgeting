import { defaultTransactions, inflowCategories } from './defaults';

/**
 * Action Constants
 */
const ADD_TRANSACTION = 'budget/transaction/ADD';
const DELETE_TRANSACTION = 'budget/transaction/DELETE';

/**
 * Helpers
 */
function getNextTransactionID(state) {
  return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// Add a new transaction.
function normalizeTransaction(state, { categoryId, description, value }) {
  const categoryNumId = parseInt(categoryId, 10);
  const realValue = inflowCategories.includes(categoryNumId) ? Math.abs(value) : Math.abs(value) * -1;

  return {
    id: getNextTransactionID(state),
    categoryId: categoryNumId,
    description,
    value: realValue,
  };
}

/**
 * Actions
 */
export const actions = {
  addTransaction: transaction => (dispatch, getState) =>
    dispatch({
      type: ADD_TRANSACTION,
      transaction: normalizeTransaction(getState().transactions, transaction),
    }),

  deleteTransaction: id => ({
    type: DELETE_TRANSACTION,
    id,
  }),
};

/**
 * Reducer
 */
export default function transactionsReducer(state = defaultTransactions, action) {
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
