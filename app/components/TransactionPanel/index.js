// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import TransactionDetails from 'containers/TransactionDetails';
import BackTabbar from './BackTabbar';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const TransactionPanel = () => (
  <section>
    <BackTabbar />

    <Switch>
      <Route path="/transaction/:id" component={TransactionDetails} />
      <Redirect to="/budget" />
    </Switch>
  </section>
);

export default TransactionPanel;
