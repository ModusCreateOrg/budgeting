// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getInflowBalance, getOutflowBalance, getTransactions } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import DonutChart from 'components/DonutChart';
import Percentage from 'components/Percentage';
import type { TransactionSummary } from 'selectors/transactions';

injectAsyncReducers({
  transactions: transactionReducer,
});

type TransactionProps = {
  inflowBalance: Number,
  outflowBalance: Number,
  transactions: TransactionSummary,
};

class Transaction extends React.Component<TransactionProps> {
  render() {
    const { inflowBalance, outflowBalance, transactions } = this.props;
    const { match: { params: { id } } } = this.props;
    const transaction = transactions.find(trans => trans.id === Number(id));
    const balance = transaction.value < 0 ? outflowBalance : inflowBalance;
    const reducedTransactions = [
      { id: transaction.description, value: Math.abs(transaction.value) },
      {
        id: `Other ${transaction.value < 0 ? 'outflow' : 'inflow'}`,
        value: Math.abs(balance) - Math.abs(transaction.value),
      },
    ];

    return (
      <div>
        <h1>{transaction.description}</h1>
        <Percentage balance={balance} value={transaction.value} />
        <DonutChart data={reducedTransactions} dataLabel="id" dataKey="id" />
        <Link to="/budget">Back</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inflowBalance: getInflowBalance(state),
  outflowBalance: getOutflowBalance(state),
  transactions: getTransactions(state),
});

export default connect(mapStateToProps)(Transaction);
