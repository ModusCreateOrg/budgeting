import React from 'react';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import DetailSection from 'components/DetailSection';
import { connect } from 'react-redux';
import { getTransactions, getTransactionById } from 'selectors/transactions';

injectAsyncReducers({
  transactions: transactionReducer,
});

const Detail = ({ id, transaction, history }) => (
  <div>
    <DetailSection
      onGoBack={() => {
        history.goBack();
      }}
      transaction={transaction}
      transactionId={id}
    />
  </div>
);

const mapStateToProps = (state, { id }) => {
  const transaction = getTransactions(state, id).filter(t => t.id === Number(id))[0];
  const categoryTransactions = getTransactions(state).filter(t => (transaction.value > 0 ? t.value > 0 : t.value < 0));
  const total = categoryTransactions.reduce((acc, curr) => ({
    value: Math.abs(acc.value) + Math.abs(curr.value),
  })).value;
  const value = Math.abs(transaction.value);
  const percent = (value * 100 / total).toFixed(1);
  const sign = transaction.value > 0 ? '+' : '-';

  return {
    transaction: {
      ...transaction,
      percent,
      total,
      value,
      sign,
    },
  };
};

export default connect(mapStateToProps)(Detail);
