import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'containers/EntryFormRow';
import BudgetGridRow from './BudgetGridRow';
import styles from './style.scss';

export class BudgetGrid extends Component {
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

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default connect(mapStateToProps)(BudgetGrid);
