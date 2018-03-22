// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import TransactionDetail from 'containers/TransactionDetail';

injectAsyncReducers({
  transactions: transactionReducer,
});

class TransactionContainer extends React.Component<{}> {
  render() {
    return (
      <section>
        <TransactionDetail {...this.props} />
      </section>
    )
  }
}

export default TransactionContainer;
