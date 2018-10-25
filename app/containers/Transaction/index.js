// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import TransactionDetail from 'containers/TransactionDetail';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const TransactionContainer = props => (
  <section>
    <TransactionDetail {...props} />
  </section>
);

export default withRouter(TransactionContainer);
