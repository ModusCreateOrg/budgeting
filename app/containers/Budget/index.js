// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetGrid from 'containers/BudgetGrid';

const Balance = React.lazy(() => import('containers/Balance' /* webpackChunkName: "balance" */));

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const BudgetContainer = () => (
  <section>
    <BudgetGrid />
    <Balance />
  </section>
);

export default BudgetContainer;
