import { createSelector } from 'reselect';
import formatAmount from 'utils/formatAmount';

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

function totalTransactions(transactions) {
  return transactions.reduce((total, item) => total + parseFloat(item.value), 0).toFixed(2);
}

function summarizeTransactions(transactions) {
  return transactions.reduce((summary, { categoryId, value }) => {
    const sum = summary.find(item => item.categoryId === categoryId) ||
      summary[summary.push({ categoryId, value: 0 }) - 1];

    sum.value += Math.abs(value);
    return summary;
  }, []);
}

/**
 * Selectors
 */
export const getTransactions = state => state.transactions;

export const getInflowTransactions = createSelector(
  [getTransactions],
  transactions => transactions.filter(item => item.value > 0)
);

export const getOutflowTransactions = createSelector(
  [getTransactions],
  transactions => transactions.filter(item => item.value < 0)
);

export const getBalance = createSelector(
  [getTransactions],
  transactions => totalTransactions(transactions)
);

export const getInflowBalance = createSelector(
  [getInflowTransactions],
  transactions => totalTransactions(transactions)
);

export const getOutflowBalance = createSelector(
  [getOutflowTransactions],
  transactions => totalTransactions(transactions)
);

export const getFormattedBalance = createSelector(
  [getBalance],
  amount => formatAmount(amount, false)
);

export const getFormattedInflowBalance = createSelector(
  [getInflowBalance],
  amount => formatAmount(amount, false)
);

export const getFormattedOutflowBalance = createSelector(
  [getOutflowBalance],
  amount => formatAmount(amount, false)
);

export const getOutflowByCategory = createSelector(
  [getOutflowTransactions],
  transactions => summarizeTransactions(transactions)
);

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
