import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Budget from 'containers/Budget';
import './style.scss';

const Reports = () => <h1>Reports</h1>;

const App = () => (
  <div>
    <Header />

    <Switch>
      <Route path="/budget" component={Budget} />
      <Route path="/reports" component={Reports} />
      <Redirect to="/budget" />
    </Switch>
  </div>
);

export default App;
