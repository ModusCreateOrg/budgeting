// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';

type TransactionDetailProps = {
  transactions: Transaction[],
  inflow: number,
  outflow: number,
};

class TransactionDetailContainer extends React.Component<TransactionDetailProps> {
  render() {
    const { transactions, inflow, outflow } = this.props;
    const transactionId = Number(this.props.match.params.id);
    const transactionData = transactions.filter(transaction => transaction.id === transactionId);

    // Invalid transaction ID
    if(transactionData.length === 0) {
      return (
        <section>
          <div>Transaction #{this.props.match.params.id} does not exist</div>
        </section>
      );
    }

    const transactionDesc = transactionData[0].description;
    const transactionValue = transactionData[0].value;
    const isNegative = transactionValue < 0;
    const contributionPercent = isNegative
      ? (100 * Math.abs(transactionValue / outflow)).toFixed(2)
      : (100 * Math.abs(transactionValue / inflow)).toFixed(2);

    const chartData = [
      {
        transactionId: transactionData[0].id,
        value: Math.abs(transactionData[0].value),
        description: transactionData[0].description,
      },
    ];

    if (transactionData[0].value > 0) {
      chartData.push({
        transactionId: `${transactionData[0].id}+'other'`,
        value: inflow - transactionData[0].value,
        description: 'Other Income',
      });
    }

    if (transactionData[0].value < 0) {
      chartData.push({
        transactionId: `${transactionData[0].id}+'other'`,
        value: Math.abs(outflow - transactionData[0].value),
        description: 'Other Expenses',
      });
    }

    return (
      <section>
        <h3>{transactionDesc}</h3>
        <div>
          Percent:
          {isNegative ? `-` : `+`}
          {contributionPercent}
          %
        </div>
        <div>
          Value:
          {isNegative ? `-` : `+`}
          $
          {Math.abs(transactionValue)}
        </div>
        <div>Total inflow: {inflow}</div>
        <div>Total outflow: {outflow}</div>
        <div>------</div>
        <DonutChart data={chartData} dataLabel="description" dataKey="transactionId" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default withRouter(connect(mapStateToProps)(TransactionDetailContainer));
