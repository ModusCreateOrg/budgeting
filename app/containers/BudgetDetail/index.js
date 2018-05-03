// @flow

import * as React from 'react';
import { injectAsyncReducers } from 'store';
import { connect } from 'react-redux';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import transactionReducer, { Transaction } from 'modules/transactions';
import TransactionDetail from 'components/TransactionDetail';


// inject reducers that might not have been originally there
injectAsyncReducers({ transactions: transactionReducer });

type Props = {
  match: {
    params: {
      id: number,
    },
  },
  transactions: Transaction[],
  inflowBalnce: number,
  outFlowBalance: number,
};

class BudgetDetail extends React.Component<Props> {
  getTranscation = (): React.Element<any> => {
    const id = this.props.match.params.id;
    const total = this.totalbalance();
    const transaction = this.props.transactions.filter(tx => tx.id === id);
    console.log(transaction);
    return transaction.map((item: Transaction ) => (
      <TransactionDetail
        value={item.value}
        key={item.id}
        title={item.description}
        total={total}
        inflow={this.props.inflowBalance}
        outflow={this.props.outFlowBalance}
      />
    ));
  }
  totalbalance = () => {
    const inflow = this.props.inflowBalance;
    const outflow = this.props.outFlowBalance;
    console.log(inflow, -outflow);
    return inflow + (-outflow);
  }
  render() {
    return <div>{this.getTranscation()}</div>;
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflowBalance: getInflowBalance(state),
  outFlowBalance: getOutflowBalance(state),
});
export default connect(mapStateToProps)(BudgetDetail);
