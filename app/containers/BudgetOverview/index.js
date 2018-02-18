import * as React from 'react';
import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories'
import BudgetGrid from 'containers/BudgetGrid';
import Balance from 'containers/Balance';

// inject reducers that might not have been originally there
injectAsyncReducers({
    transactions: transactionReducer,
    categories: categoryReducer,
});

const BudgetOverview = () =>
    (
        <section>
            <BudgetGrid />
            <Balance />
        </section>
    )


export default BudgetOverview;