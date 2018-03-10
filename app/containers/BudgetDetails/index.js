import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import DonutChart from 'components/DonutChart';

import styles from 'components/BudgetGridRow/style.scss';

type BudgetDetailsProps = {
  transactions: Transaction[],
  categories: Object,
  selectedTransaction: Transaction,
};

export class BudgetDetails extends React.Component<BudgetDetailsProps> {
  static defaultProps = {
    transactions: [],
    selectedTransaction: {}
  };

  componentWillMount() {
    const { transactions, history, match: { params: { transactionId } } } = this.props;

    if (!transactionId ||
      transactionId && !transactions.length
    ) {
      this.navigateToBudget();
    }
  }

  serializeData = () => {

  }

  navigateToBudget = () =>
    this.props.history.push('/budget')

  render() {
    const { transactions, selectedTransaction, categories } = this.props;

    if (Object.keys(selectedTransaction).length === 0) {
      return null;
    }

    const category = categories[Object.keys(categories).find(categoryId => categoryId === selectedTransaction.categoryId)];
    const percentageTextStyles = selectedTransaction.value < 0 ? styles.neg : styles.pos;

    const absTotal = transactions.reduce((prev, next) => {
      return prev + Math.abs(next.value);
    }, 0);
    const percentageAmount = Math.floor(
      Math.abs(selectedTransaction.value) / absTotal * 100
    );

    const newTransactions = [selectedTransaction].concat(
      transactions.filter(transaction => transaction.id !== selectedTransaction.id)
    ).map(transaction => ({
      ...transaction,
      absValue: Math.abs(transaction.value)
    }))
    console.log('selectedTransaction: ', selectedTransaction);
    console.log('newTransactions: ', newTransactions);

    return (
      <div>
        <h1>{selectedTransaction.description}</h1>

        <div className={percentageTextStyles}>
          {selectedTransaction.value < 0 ? '-' : '+'} {percentageAmount}%
        </div>

        <DonutChart
          showOne
          data={newTransactions}
          dataLabel="description"
          dataKey="description"
          dataValue="absValue"
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
    categories: getCategories(state),
    selectedTransaction,
    transactions,
  };
};

export default withRouter(
  connect(mapStateToProps)(BudgetDetails)
);
