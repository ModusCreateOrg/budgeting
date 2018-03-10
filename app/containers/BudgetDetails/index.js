import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';

// reuse styles from grid row
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
    const { transactions, match } = this.props;
    const transactionId = match && match.params ? match.params.transactionId : '';

    // go back to BudgetTable if data not available
    if (!transactionId ||
      transactionId && !transactions.length
    ) {
      this.navigateToBudget();
    }
  }

  serializeData = () => {
    const { selectedTransaction, transactions } = this.props;

    if (!transactions && transactions.length) {
      return [];
    }

    let absTotal = selectedTransaction.value;
    const isNegative = Boolean(selectedTransaction.value < 0)

    const otherTransactions = transactions
      .filter(_ => _.id !== selectedTransaction.id)
      .filter(_ => isNegative
        ? _.value < 0
        : _.value >= 0
      )
      .reduce((prev, next) => {
        absTotal += next.value;
        return {
          ...prev,
          value: prev.value + Math.abs(next.value)
        }
      }, {
        id: Math.random(),
        isNegative,
        description: isNegative ? 'Other Expenses' : 'Other Income',
        value: 0
      })

    const serializedSelectedTransaction = {
      ...selectedTransaction,
      isNegative,
      value: Math.abs(selectedTransaction.value),
      percentage: Math.floor(
        selectedTransaction.value / absTotal * 100
      ),
    };

    return [serializedSelectedTransaction, otherTransactions]
  }

  navigateToBudget = () => {
    if (this.props.history) {
      this.props.history.push('/budget')
    }
  }

  render() {
    const selectedTransaction = this.props.selectedTransaction;

    if (Object.keys(selectedTransaction).length === 0) {
      return null;
    }

    // returns array of 2 items, [selected, expenses/income]
    const donutData = this.serializeData();
    const currentItem = donutData[0];
    // styles to show red or green
    const percentageTextStyles = currentItem.isNegative ? styles.neg : styles.pos;

    return (
      <div>
        <h1>{currentItem.description}</h1>

        <h2 className={percentageTextStyles}>
          {currentItem.isNegative ? '-' : '+'}{currentItem.percentage}%
        </h2>

        <DonutChart
          data={donutData}
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
  let transactionId = '';
  let selectedTransaction = '';
  if (ownProps.match && ownProps.match.params) {
    transactionId = ownProps.match.params.transactionId;
    selectedTransaction = transactions.find(transaction => transaction.id === Number(transactionId));
  }

  return {
    selectedTransaction,
    transactions,
  };
};

export default withRouter(
  connect(mapStateToProps)(BudgetDetails)
);
