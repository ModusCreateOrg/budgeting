// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import type { Transaction } from 'modules/transactions';
import { getTransactionById } from 'selectors/transactions';
import TransactionDetails from 'containers/TransactionDetails';

import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';

import styles from './style.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type TransactionPageProps = {
  transaction: Transaction,
};

export class TransactionPage extends React.Component<TransactionPageProps> {
  render() {
    const { transaction } = this.props;
    return (
      <div>
        <Route>
          <Link to="/budget">&larr; Back to list</Link>
        </Route>
        {!transaction && <p className={styles.notFoundMsg}>Transaction could not be found!</p>}
        {transaction && <TransactionDetails transaction={transaction} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  transaction: getTransactionById(+props.match.params.transactionId)(state),
});

// withRouter is used to pass on the match prop, so that transactionId can be used from the URL
export default withRouter(connect(mapStateToProps)(TransactionPage));
