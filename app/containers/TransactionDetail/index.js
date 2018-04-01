// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { Transaction } from 'modules/transactions';

type TransactionDetailProps = {
  transaction: Transaction,
};

export class TransactionDetailContainer extends React.Component<TransactionDetailProps> {
  static defaultProps = {
    transaction: undefined,
  };

  render() {
    if (!this.props.match.params.transactionId) {
      return this.props.history.replace('/budget');
    }

    const transaction = this.props.transactions.find(tr => +tr.id === +this.props.match.params.transactionId);

    let total = 0;
    if (transaction.value > 0) {
      total = this.props.inflowBalance;
    } else {
      total = this.props.outflowBalance;
    }
    const rest = total - transaction.value;

    const data = {
      labels: [transaction.description, `Other ${transaction.value > 0 ? 'Inflows' : 'Outflows'}`],
      datasets: [
        {
          data: [transaction.value, +rest.toFixed(2)],
          backgroundColor: ['#ffb03b', '#2f7d6d'],
          hoverBackgroundColor: ['#36A2EB', '#36A2EB'],
        },
      ],
    };

    return (
      <div style={{ padding: '20px' }}>
        <Link to={'/budget'}>Back </Link>
        <h3>{transaction.description}</h3>
        <span style={{ color: transaction.value > 0 ? 'green' : 'red', fontWeight: 'bold' }}>{`%${(transaction.value /
          total *
          100).toFixed(2)}`}</span>
        <Pie data={data} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflowBalance: getInflowBalance(state),
  outflowBalance: getOutflowBalance(state),
});

export default connect(mapStateToProps)(withRouter(TransactionDetailContainer));
