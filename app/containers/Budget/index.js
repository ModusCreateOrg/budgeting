// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetGrid from 'containers/BudgetGrid';
import Balance from 'containers/Balance';

import TransactionDetails from 'containers/TransactionDetails';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const BudgetContainer = () => (
  
  <section>
    <Switch>
      <Route path="/budget/transactions/:id" component={TransactionDetails} />
      <Route path="/budget/transactions" component={BudgetGrid} />      
      <Redirect to="/budget/transactions" />
    </Switch>

    <Balance />
  </section>
);

export default BudgetContainer;
