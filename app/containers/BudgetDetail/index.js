// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetContentDetail from 'containers/BudgetContentDetail';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const BudgetDetailContainer = () => (
  <section>
    <BudgetContentDetail />
  </section>
);

export default BudgetDetailContainer;
