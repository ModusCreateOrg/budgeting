import {
  defaultTransactions
} from './defaults';

import { actions as summaryActions } from './summary';


/**
 * Action Constants
 */
const ADD_TRANSACTION = 'budget/transaction/ADD';
const DELETE_TRANSACTION = 'budget/transaction/DELETE';


/**
 * Actions
 */
export const actions = {
  createTransaction: transaction => ({
    type: ADD_TRANSACTION,
    transaction
  }),

  deleteTransaction: id => ({
    type: DELETE_TRANSACTION,
    id
  }),

  addTransaction: transaction => (
    (dispatch, getState) => {
      const addedResult = dispatch(actions.createTransaction(transaction));
      dispatch(summaryActions.requestSum(getState().transactions));
      return addedResult;
    }
  )
};


/**
 * Helpers
 */

function getNextTransactionID(state) {
  return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// Add a new transaction.
function addTransactionToState(state, action) {
  const { description, value } = action.transaction;
  const newState = [...state, {
    id: getNextTransactionID(state),
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
