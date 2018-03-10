import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';

import styles from 'components/BudgetGridRow/style.scss';

type BudgetDetailsProps = {
  transactions: Transaction[],
  selectedTransaction: Transaction,
};

export class BudgetDetails extends React.Component<BudgetDetailsProps> {
  static defaultProps = {
    transactions: [],
    selectedTransaction: {}
  };

  componentWillMount() {
    const { transactions, match: { params: { transactionId } } } = this.props;

    if (!transactionId ||
      transactionId && !transactions.length
    ) {
      this.navigateToBudget();
    }
  }

  serializeData = () => {
    const { selectedTransaction, transactions } = this.props;

    const absTotal = transactions.reduce((prev, next) => {
      return prev + Math.abs(next.value);
    }, 0);

    const serializedSelectedTransaction = {
      ...selectedTransaction,
      isNegative: Boolean(selectedTransaction.value < 0),
      percentage: Math.floor(
        Math.abs(selectedTransaction.value) / absTotal * 100
      ),
    };

    const restTransactions = transactions
      .filter(_ => _.id !== selectedTransaction.id)
      .filter(_ => serializedSelectedTransaction.isNegative
        ? _.value < 0
        : _.value >= 0
      )
      .reduce((prev, next) => ({
        ...prev,
        value: prev.value + next.value
      }), {
        id: Math.random(),
        description: serializedSelectedTransaction.isNegative ? 'Other Expenses' : 'Other Income',
        value: 0
      })

    return [serializedSelectedTransaction, restTransactions]
  }

  navigateToBudget = () =>
    this.props.history.push('/budget')

  render() {
    const selectedTransaction = this.props.selectedTransaction;

    if (Object.keys(selectedTransaction).length === 0) {
      return null;
    }

    const transactions = this.serializeData();
    const percentageTextStyles = transactions[0].isNegative ? styles.neg : styles.pos;

    return (
      <div>
        <h1>{transactions[0].description}</h1>

        <div className={percentageTextStyles}>
          {transactions[0].isNegative ? '-' : '+'} {transactions[0].percentage}%
        </div>

        <DonutChart
          data={transactions}
          dataLabel="description"
          dataKey="description"
        />

        <button onClick={this.navigateToBudget}>Go Back</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const transactions = getTransactions(state);
  const transactionId = ownProps.match.params.transactionId;
  const selectedTransaction = transactions.find(transaction => transaction.id === Number(transactionId));

  return {
    selectedTransaction,
    transactions,
  };
};

export default withRouter(
  connect(mapStateToProps)(BudgetDetails)
);
