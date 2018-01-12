import React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';

injectAsyncReducers({
  transactions: transactionReducer,
});

class Transaction extends React.Component {
  render() {
    const { transactions } = this.props;
    const { match: { params: { id } } } = this.props;
    const transaction = transactions.find(trans => trans.id === Number(id));

    return (
      <div>
        <h1>{transaction.description}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
});

export default connect(mapStateToProps)(Transaction);
