// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import BudgetItem from 'components/BudgetItem';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer
});

const BudgetItemContainer = () => (
  <section>
    <BudgetItem />
  </section>
);

export default BudgetItemContainer;
