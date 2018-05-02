// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import type { Transaction } from 'modules/transactions';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import TransactionDetail from 'components/TransactionDetail';

type BalanceProps = {
  inflow: number,
  outflow: number,
};

type TransactionContainerProps = {
  transactions: Transaction[],
  balance: BalanceProps,
};

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

class TransactionContainer extends React.Component<TransactionContainerProps> {
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  };

  render() {
    const { match, transactions, balance } = this.props;
    const transaction = transactions.find(item => item.id === parseInt(match.params.id, 10));

    return (
      <section style={{ textAlign: 'center' }}>
        <a role="button" tabIndex="0" style={{ cursor: 'pointer' }} onClick={this.context.router.history.goBack}>
          &#9665; Back
        </a>
        <TransactionDetail transaction={transaction} balance={balance} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  balance: {
    inflow: getInflowBalance(state),
    outflow: getOutflowBalance(state),
  },
});

export default connect(mapStateToProps)(TransactionContainer);
