// @flow
import * as React from 'react';
import { type RouterHistory } from 'react-router';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetGrid from 'containers/BudgetGrid';
import Balance from 'containers/Balance';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const BudgetContainer = ({ history }: { history: RouterHistory }) => (
  <section>
    <BudgetGrid onRowClick={id => history.push(`/budget/${id}`)} />
    <Balance />
  </section>
);

export default BudgetContainer;
