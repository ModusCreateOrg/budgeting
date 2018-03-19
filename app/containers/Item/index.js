// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import ItemDetail from 'containers/ItemDetail';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const ItemContainer = () => (
  <section>
    <ItemDetail />
  </section>
);

export default ItemContainer;
