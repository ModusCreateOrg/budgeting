// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import ItemPercentage from 'containers/ItemPercentage';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const ItemContainer = () => (
  <section>
    <ItemPercentage />
  </section>
);

export default ItemContainer;
