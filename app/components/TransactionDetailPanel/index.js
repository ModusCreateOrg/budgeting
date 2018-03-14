// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BackButton from 'components/BackButton';
import TransactionDetailContainer from 'containers/TransactionDetail';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const TransactionDetailPanel = () => (
  <section>
    <BackButton />
    <TransactionDetailContainer />
  </section>
);

export default TransactionDetailPanel;
