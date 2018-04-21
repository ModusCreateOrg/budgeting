// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransaction, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import TransactionDetails from 'components/TransactionDetails';
import { history } from 'react-router';

type TransactionReportProps = {
  transaction: Transaction,
  inflow: number,
  outflow: number
};

class TransactionReport extends React.Component<TransactionReportProps> {
  render() {
    const {transaction, inflow, outflow}  = this.props;
    if(!transaction) {
      return (
        <section>
          That id doesn't match with any budget item...
        </section>
      )
    }
    const isNegative = transaction.value < 0;
    const balance = isNegative ? outflow : inflow;
    const remainder = balance - transaction.value;
    const percent = (transaction.value * 100 / balance).toFixed(2)
    const data = [
        {id: transaction.id, value: Math.abs(transaction.value), description: transaction.description},
        {id: -1 ,value: Math.abs(remainder), description: "Other"}
      ]
    debugger; 
    return (
      <TransactionDetails transaction={transaction} percent={percent} data={data} isNegative={isNegative} history={this.props.history}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, Number(ownProps.match.params.id)),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(TransactionReport);
