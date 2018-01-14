// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Transaction } from 'modules/transactions';
import { getTransactions } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import { Link } from 'react-router-dom';
import { injectAsyncReducers } from 'store';
import ItemBudgetDetail from 'components/ItemBudgetDetail';
import styles from './styles.scss';

type ItemBudgetContributionProps = {
  transactions: Transaction[],
  match: Object,
};

injectAsyncReducers({
  transactions: transactionReducer,
});

class ItemBudgetContribution extends React.Component<ItemBudgetContributionProps> {
  componentWillMount() {
    const { match: { params }, transactions } = this.props;
    const currentTransaction = transactions.find(transaction => transaction.id === parseInt(params.itemId, 10));
    this.setState({
      currentTransaction,
      transactions,
    });
  }

  render() {
    const { currentTransaction } = this.state;
    const { transactions } = this.props;
    const isOutflow = currentTransaction.value > 0;
    const totalBudget = transactions.reduce((sum, transaction) => {
      if (isOutflow === transaction.value > 0) {
        sum += Math.abs(transaction.value);
      }
      return sum;
    }, 0);
    return (
      <div>
        <Link to="/budget">
          <button className={styles.backButton}>Back</button>
        </Link>
        <ItemBudgetDetail transaction={currentTransaction} totalBudget={totalBudget} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
});

export default connect(mapStateToProps)(ItemBudgetContribution);
