import React from 'react';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import ItemDetails from 'components/ItemDetails';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';

injectAsyncReducers({
  transactions: transactionReducer,
});

const Details = ({ transaction, history }) => (
  <div>
    <ItemDetails history={history} transaction={transaction} />
  </div>
);

const stateMapping = (state, { id }) => {
  const item = getTransactions(state, id)
    .filter(t => t.id === Number(id))
    .shift();

  const category = getTransactions(state).filter(t => (item.value > 0 ? t.value > 0 : t.value < 0));
  const totalBudget = category.reduce((a, b) => ({
    value: Math.abs(a.value) + Math.abs(b.value),
  })).value;
  const value = Math.abs(item.value);
  const percent = (value * 100 / totalBudget).toFixed(2);
  const itemOperator = item.value > 0 ? '+' : '-';
  const flow = item.value > 0 ? 'Inflow' : 'Outflow';

  return {
    transaction: {
      ...item,
      value,
      itemOperator,
      totalBudget,
      percent,
      flow,
    },
  };
};

export default connect(stateMapping)(Details);
