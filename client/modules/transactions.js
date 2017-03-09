import {
  defaultTransactions
} from './defaults';

import { actions as summaryActions } from './summary';

const ADD_TRANSACTION = 'budgeting-sample-app/transaction/ADD_TRANSACTION';
const DELETE_TRANSACTION = 'budgeting-sample-app/transaction/DELETE_TRANSACTION';

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
      dispatch(summaryActions.requestSum(getState().transactions.transactions));
      return addedResult;
    }
  )
};

/**
 * Add a new transaction.
 * This is a helper function for the transactions reducer
 * @param {Object} state
 * @param {Object} action
 */
function addTransactionToState(state, action) {
  const { description, value } = action.transaction;
  const newState = [...state, {
    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
    description,
    value
  }];
  return newState;
}

/**
 * Main transactions reducer
 * @param  {Object} state  Current state
 * @param  {Object} action Dispatched action
 * @return {Object}        Default state
 */
export default function reducer(state = defaultTransactions, action) {
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
