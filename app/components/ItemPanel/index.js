// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import { withRouter } from 'react-router-dom';
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
