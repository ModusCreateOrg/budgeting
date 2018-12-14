// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';

const DetailsPanel = React.lazy(() => import('containers/DetailsPanel' /* webpackChunkName: "details-panel" */));

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const DetailsContainer = () => (
  <section>
    <DetailsPanel />
  </section>
);

export default DetailsContainer;
