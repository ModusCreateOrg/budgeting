// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import AppError from 'components/AppError';
import Header from 'components/Header';
import Budget from 'routes/Budget';
import Reports from 'routes/Reports';
import BudgetItem from 'routes/BudgetItem';
import './style.scss';

const App = () => (
  <ErrorBoundary fallbackComponent={AppError}>
    <main>
      <Header />

      <Switch>
        <Route path="/budget" component={Budget} />
        <Route path="/reports" component={Reports} />
        <Route path="/item/:itemId" render={props => <BudgetItem {...props} />} />
        <Redirect to="/budget" />
      </Switch>
    </main>
  </ErrorBoundary>
);

export default App;
