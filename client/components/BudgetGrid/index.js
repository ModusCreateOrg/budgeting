import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'components/EntryFormRow';
import BudgetGridRow from './BudgetGridRow';
import styles from './style.scss';

@connect(state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
}))
class BudgetGrid extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    categories: PropTypes.object,
  };

  static defaultProps = {
    transactions: [],
    categories: {},
  };

  render() {
    const { transactions, categories } = this.props;

    return (
      <table className={styles.budgetGrid}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <BudgetGridRow key={transaction.id} transaction={transaction} categories={categories} />
          ))}
        </tbody>
        <tfoot>
          <EntryFormRow />
        </tfoot>
      </table>
    );
  }
}

export default BudgetGrid;
