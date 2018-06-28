// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import AppError from 'components/AppError';
import Header from 'components/Header';
import Budget from 'routes/Budget';
import Reports from 'routes/Reports';
import Transaction from 'routes/Transaction';
import TransactionModal from 'routes/TransactionModal';
import './style.scss';

class App extends Component {
  componentDidUpdate(nextProps) {
    const { location } = this.props;
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  previousLocation = this.props.location;

  render() {
    const { location } = this.props;
    const isModal = !!(location.state && location.state.modal && this.previousLocation !== location);

    return (
      <ErrorBoundary fallbackComponent={AppError}>
        <main>
          <Header />

          <Switch location={isModal ? this.previousLocation : location}>
            <Route path="/budget" component={Budget} />
            <Route path="/transaction/:id" component={Transaction} />
            <Route path="/reports" component={Reports} />
            <Redirect to="/budget" />
          </Switch>
          {isModal ? <Route path="/transaction/:id" component={TransactionModal} /> : null}
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;
