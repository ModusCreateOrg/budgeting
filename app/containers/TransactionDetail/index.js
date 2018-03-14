// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

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
    if (transactionData.length === 0) {
      return (
        <section>
          <div>Transaction #{this.props.match.params.id} does not exist</div>
        </section>
      );
    }

    const transactionDesc = transactionData[0].description;
    const transactionValue = transactionData[0].value;
    const isNegative = transactionValue < 0;

    // For inflow transactions, the contribution is calculated with respect to total inflow
    // For outflow transactions, the contribution is calculated with respect to total outflow
    const contributionPercent = isNegative
      ? (100 * Math.abs(transactionValue / outflow)).toFixed(2)
      : (100 * Math.abs(transactionValue / inflow)).toFixed(2);

    // Add current transation item as first item in the chart data
    const chartData = [
      {
        transactionId: `${transactionId}+''`,
        value: Math.abs(transactionValue),
        description: transactionDesc,
      },
    ];

    // For inflow transaction, push the remaining inflow (ie. total inflow minus current transaction value)
    // as second chart item for comparison
    if (transactionValue > 0) {
      chartData.push({
        transactionId: `${transactionId}+'other'`,
        value: inflow - transactionValue,
        description: 'Other Income',
      });
    }

    // For outflow transaction, push the remaining outflow (ie. total outflow minus current transaction value)
    // as second chart item for comparison
    if (transactionValue < 0) {
      chartData.push({
        transactionId: `${transactionId}+'other'`,
        value: Math.abs(outflow - transactionValue),
        description: 'Other Expenses',
      });
    }

    const amountCls = isNegative ? styles.neg : styles.pos || '';

    return (
      <section>
        <div className={styles.transactionTitle}>{transactionDesc}</div>
        <div className={`${styles.transactionAmount} ${amountCls}`}>
          {isNegative ? `-` : `+`}
          {contributionPercent}% (${Math.abs(transactionValue)})
        </div>
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
