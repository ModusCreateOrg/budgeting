// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetGrid from 'containers/BudgetGrid';
import BudgetItem from 'containers/BudgetItem';
import Balance from 'containers/Balance';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const BudgetContainer = props => {
  const { params } = props.match;
  const budgetId = parseFloat(params.id) || null;

  if (budgetId) {
    return (
      <section>
        <BudgetItem id={budgetId} />
      </section>
    );
  }

  return (
    <section>
      <BudgetGrid />
      <Balance />
    </section>
  );
};

export default BudgetContainer;
