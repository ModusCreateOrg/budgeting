// @flow
import * as React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import AppError from 'components/AppError';
import Header from 'components/Header';
import Budget from 'routes/Budget';
import Reports from 'routes/Reports';
import Detail from 'containers/Detail';
import createBrowserHistory from 'history/createBrowserHistory';

import './style.scss';

const history = createBrowserHistory();

const App = () => (
  <ErrorBoundary fallbackComponent={AppError}>
    <main>
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/budget" component={Budget} />
          <Route path="/reports" component={Reports} />
          <Route path="/detail/:id" component={Detail} />
          <Redirect to="/budget" />
        </Switch>
      </Router>
    </main>
  </ErrorBoundary>
);

export default App;
