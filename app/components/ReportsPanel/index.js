// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import injectAsyncReducersWithDefaults from 'utils/injectAsyncReducersWithDefaults';
import InflowOutflow from 'containers/InflowOutflow';
import Spending from 'containers/Spending';
import ReportsTabbar from './ReportsTabbar';

injectAsyncReducersWithDefaults();

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
