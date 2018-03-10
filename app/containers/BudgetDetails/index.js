import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';

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
      history.push('/budget');
    }
  }

  render() {
    const { selectedTransaction, categories } = this.props;
    console.log('selectedTransaction: ', selectedTransaction);
    const category = categories[Object.keys(categories).find(categoryId => categoryId === selectedTransaction.categoryId)];
    console.log('category: ', category);

    if (Object.keys(selectedTransaction).length === 0) {
      return null;
    }

    return (
      <div>
        <h1>{selectedTransaction.description}</h1>

        <p>{selectedTransaction.value}</p>
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
