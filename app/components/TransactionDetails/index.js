// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import InflowOutflow from 'containers/InflowOutflow';
import Spending from 'containers/Spending';

// inject reducers that might not have been originally there
  import BackTabbar from './BackTabbar';
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const TransactionDetails = () => (
  <section>
    <BackTabbar/>

    <Switch>
      <Route path="/transaction/:id" component={Spending} />
      <Redirect to="/budget" />
    </Switch>
  </section>
);

export default TransactionDetails;
