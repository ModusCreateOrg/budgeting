// @flow
import React from 'react';
import { connect } from 'react-redux';
import { injectAsyncReducers } from 'store';
import { findTransaction, getOutflowBalance, getInflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import categoryReducer from 'modules/categories';
import transactionReducer from 'modules/transactions';
import TransactionDetail, { TransactionProps } from 'components/TransactionDetail';

injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

// Get the props for the Detail component, this will be called only if the id is valid
const getProps = (state, transaction, categories) => {
  const { value, description, categoryId } = transaction;
  const isInflow = value >= 0;
  const total = isInflow ? getInflowBalance(state) : getOutflowBalance(state);
  const percentage = value / total * 100;
  const category = categories[categoryId];
  return {
    description,
    category,
    value: Math.abs(value),
    difference: Math.abs(total - value),
    percentage: `${!isInflow ? '-' : '+'} ${percentage.toFixed(2)} %`,
    isInflow,
  };
};

// Find and build transaction from url params
const mapStateToProps = (state, { match: { params: { transactionId } } }) => {
  const transaction = findTransaction(state, parseInt(transactionId, 10));
  const categories = getCategories(state);

  // Build the props for the Detail component only if the given transaction id is found
  return transaction !== undefined ? getProps(state, transaction, categories) : {};
};

// wrap TransactionDetail component in a Section tag
const TransactionDetailContainer = (props: TransactionProps) => (
  <section>
    <TransactionDetail {...props} />
  </section>
);

export default connect(mapStateToProps)(TransactionDetailContainer);
