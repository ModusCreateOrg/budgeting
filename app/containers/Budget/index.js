// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetGrid from 'containers/BudgetGrid';
import Balance from 'containers/Balance';
import BudgetItem from './item';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const Budget = () => (
  <section>
    <BudgetGrid />
    <Balance />
  </section>
);

const BudgetContainer = ({ match }) => (
  <Switch>
    <Route exact path="/budget" component={Budget} />
    <Route path={`${match.url}/item/:id`} component={BudgetItem} />
  </Switch>
);

export default withRouter(BudgetContainer);
