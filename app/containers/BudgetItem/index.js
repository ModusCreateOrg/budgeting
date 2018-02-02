// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';

import BudgetItemDetails from 'containers/BudgetItemDetails';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

class BudgetItem extends React.Component {
  render() {
    return (
      <section>
        <BudgetItemDetails {...this.props} />
      </section>
    );
  }
}

export default BudgetItem;
