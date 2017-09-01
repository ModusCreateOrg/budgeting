// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import InflowOutflow from 'containers/InflowOutflow';
import Spending from 'containers/Spending';
import ReportsTabbar from './ReportsTabbar';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const ReportsPanel = () => (
  <section>
    <ReportsTabbar />

    <Switch>
      <Route path="/reports/inflow-outflow" component={InflowOutflow} />
      <Route path="/reports/spending" component={Spending} />
      <Redirect to="/reports/inflow-outflow" />
    </Switch>
  </section>
);

export default ReportsPanel;
