import React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';

injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const Transaction = () => <div>DETAIL!!!!!</div>;

export default Transaction;
