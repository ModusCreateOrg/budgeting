import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ReportsTabbar from './ReportsTabbar';

const InflowOutflow = () => <h1>Inflow vs Outflow</h1>;
const Spending = () => <h1>Spending by Category</h1>;

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
