import {
  defaultTransactions
} from './defaults';

/**
 * Action Constants
 */
const ADD_TRANSACTION = 'budget/transaction/ADD';
const DELETE_TRANSACTION = 'budget/transaction/DELETE';


/**
 * Actions
 */
export const actions = {
  addTransaction: transaction => ({
    type: ADD_TRANSACTION,
    transaction
  }),

  deleteTransaction: id => ({
    type: DELETE_TRANSACTION,
    id
  }),
};


/**
 * Helpers
 */
function getNextTransactionID(state) {
  return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// Add a new transaction.
function addTransactionToState(state, action) {
  const { categoryId, description, value } = action.transaction;
  const newState = [...state, {
    id: getNextTransactionID(state),
    categoryId: parseInt(categoryId, 10),
    description,
    value
  }];
  return newState;
}

/**
 * Reducer
 */
export default function transactionsReducer(state = defaultTransactions, action) {
  let newState;

  switch (action.type) {
    case ADD_TRANSACTION:
      return addTransactionToState(state, action);

    case DELETE_TRANSACTION:
      newState = state.filter(todo => todo.id !== action.id);
      return newState;

    default:
      return state;
  }
}
