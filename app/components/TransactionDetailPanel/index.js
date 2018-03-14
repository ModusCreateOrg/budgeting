// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BackButton from 'components/BackButton';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const TransactionDetailPanel = () => (
  <section>
    <div>Transaction detail page</div>
    <BackButton />
  </section>
);

export default TransactionDetailPanel;
