// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransaction } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import { Redirect } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import NavLink from 'components/NavLink';
import TransactionItem from 'components/Transaction';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

const Transaction = ({ transaction }) => (
  <section>
    <NavLink to="/budget" label="← Budget" styles={{}} />
    {transaction ? <TransactionItem {...transaction} /> : <Redirect to="/budget" />}
  </section>
);

const mapStateToProps = (state, props) => ({
  transaction: getTransaction(state, props.id),
});

export default connect(mapStateToProps)(Transaction);
