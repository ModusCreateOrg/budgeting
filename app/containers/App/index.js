// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ManagedSwitch from 'components/ManagedSwitch';
import ErrorBoundary from 'components/ErrorBoundary';
import AppError from 'components/AppError';
import Header from 'components/Header';
import Budget from 'routes/Budget';
import Reports from 'routes/Reports';
import Transaction from 'routes/Transaction';
import './style.scss';

const App = () => (
  <ErrorBoundary fallbackComponent={AppError}>
    <main>
      <Header />
      <ManagedSwitch>
        <Route path="/budget" component={Budget} />
        <Route path="/reports" component={Reports} />
        <Route path="/transaction/:id" component={Transaction} />
        <Redirect to="/budget" />
      </ManagedSwitch>
    </main>
  </ErrorBoundary>
);

export default App;
