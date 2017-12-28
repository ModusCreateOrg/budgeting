import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';

import { getTransactionById } from 'selectors/transactions';
import NotFound from 'components/NotFound';
import TransactionDetails from 'containers/TransactionDetails';

injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

@connect((state, { transactionId }) => ({
  transaction: getTransactionById(transactionId)(state),
}))
export default class Transaction extends PureComponent {
  static propTypes = {
    transactionId: PropTypes.string.isRequired,
  };

  render() {
    const { transactionId, transaction } = this.props;

    return (
      <div>
        <Link to="/budget">← Back</Link>
        {transaction ? (
          <TransactionDetails transaction={transaction} />
        ) : (
          <NotFound title="Transaction Not Found" description={`Transaction with ID "${transactionId}" not found.`} />
        )}
      </div>
    );
  }
}
