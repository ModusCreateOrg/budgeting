// @flow
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';

// inject reducers that might not have been originally there
const injectAsyncReducersWithDefaults = (extraReducers: {} = {}) => {
  injectAsyncReducers({
    transactions: transactionReducer,
    categories: categoryReducer,
    ...extraReducers,
  });
};

export default injectAsyncReducersWithDefaults;
