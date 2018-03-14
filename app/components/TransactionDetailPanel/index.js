// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const TransactionDetailPanel = () => (
  <section>
    <div>Transaction detail page</div>
  </section>
);

export default TransactionDetailPanel;
