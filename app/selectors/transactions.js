// @flow

import { createSelector } from 'reselect';
import formatAmount from 'utils/formatAmount';
import type { State } from 'modules/rootReducer';
import type { Transaction } from 'modules/transactions';
import { getCategories } from './categories';

export const TRANSACTION_TYPE_INFLOW = 'inflow';
export const TRANSACTION_TYPE_OUTFLOW = 'outflow';

export type TransactionType = 'inflow' | 'outflow';

export type TransactionSummary = {
  categoryId: string,
  value: number,
  category?: string,
};

export type TransactionContribution = {
  transaction: Transaction,
  value: number,
  total: number,
  percentage: number,
  type: TransactionType,
};

function totalTransactions(transactions: Transaction[]): number {
  return transactions.reduce((total, item) => total + parseFloat(item.value), 0);
}

function summarizeTransactions(transactions: Transaction[]): TransactionSummary[] {
  return transactions.reduce((summary, { categoryId, value }) => {
    const sum =
      summary.find(item => item.categoryId === categoryId) || summary[summary.push({ categoryId, value: 0 }) - 1];

    sum.value += Math.abs(value);
    return summary;
  }, []);
}

export const sortTransactions = <T: { value: number }>(transactions: T[]): T[] => {
  const unsorted = [...transactions];
  return unsorted.sort((a, b) => b.value - a.value);
};

const applyCategoryName = (transactions: TransactionSummary[], categories) =>
  transactions.map(transaction => {
    transaction.category = categories[transaction.categoryId];
    return transaction;
  });

export const getTransactions = (state: State): Transaction[] => state.transactions || [];

const getInflowTransactions = createSelector([getTransactions], transactions =>
  transactions.filter(item => item.value > 0)
);

const getOutflowTransactions = createSelector([getTransactions], transactions =>
  transactions.filter(item => item.value < 0)
);

const getBalance = createSelector([getTransactions], transactions => totalTransactions(transactions));

export const getInflowBalance = createSelector([getInflowTransactions], transactions =>
  totalTransactions(transactions)
);

export const getOutflowBalance = createSelector([getOutflowTransactions], transactions =>
  totalTransactions(transactions)
);

export const getTransactionById = (state: State, id: number): ?Transaction =>
  getTransactions(state).find(transaction => transaction.id === id) || null;

export const getTransactionContributionById = (state: State, transactionId: number): ?TransactionContribution => {
  const transaction = getTransactionById(state, transactionId);

  if (!transaction) {
    return null;
  }

  const type = transaction.value < 0 ? TRANSACTION_TYPE_OUTFLOW : TRANSACTION_TYPE_INFLOW;
  const value = Math.abs(transaction.value);
  const total = type === TRANSACTION_TYPE_OUTFLOW ? Math.abs(getOutflowBalance(state)) : getInflowBalance(state);
  const percentage = +(value / total * 100).toFixed(2);

  return {
    transaction,
    value,
    total,
    percentage,
    type,
  };
};

export const getFormattedBalance = createSelector([getBalance], amount => formatAmount(amount, false));

export const getFormattedInflowBalance = createSelector([getInflowBalance], amount => formatAmount(amount, false));

export const getFormattedOutflowBalance = createSelector([getOutflowBalance], amount => formatAmount(amount, false));

const getOutflowByCategory = createSelector([getOutflowTransactions], transactions =>
  summarizeTransactions(transactions)
);

const getInflowByCategory = createSelector([getInflowTransactions], transactions =>
  summarizeTransactions(transactions)
);

export const getOutflowByCategoryName = createSelector(getOutflowByCategory, getCategories, (trans, cat) =>
  applyCategoryName(trans, cat)
);

export const getInflowByCategoryName = createSelector(getInflowByCategory, getCategories, (trans, cat) =>
  applyCategoryName(trans, cat)
);
