import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Budget from 'containers/Budget';
import Reports from 'containers/Reports';
import './style.scss';

const App = () => (
  <main>
    <Header />

    <Switch>
      <Route path="/budget" component={Budget} />
      <Route path="/reports" component={Reports} />
      <Redirect to="/budget" />
    </Switch>
  </main>
);

export default App;
