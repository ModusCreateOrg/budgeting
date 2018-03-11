// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTransaction, getTransactionBalance } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import type { Transaction as TransactionProps } from 'modules/transactions';
import transactionReducer from 'modules/transactions';
import NavLink from 'components/NavLink';
import TransactionItem from 'components/Transaction';

type TransactionContainerProps = {
  id: number,
  balance: number,
  transaction: TransactionProps,
};

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

export const Transaction = ({ transaction, balance }: TransactionContainerProps) => {
  // If no transaction with a matching ID was found, redirect to budget.
  if (!transaction) return <Redirect to="/budget" />;

  return (
    <section>
      <NavLink to="/budget" label="← Budget" styles={{}} />
      <TransactionItem balance={balance} {...transaction} />
    </section>
  );
};

const mapStateToProps = (state, { id }) => ({
  transaction: getTransaction(state, id),
  balance: Math.abs(getTransactionBalance(state, id)),
});

export default connect(mapStateToProps)(Transaction);
