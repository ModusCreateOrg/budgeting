// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'containers/EntryFormRow';
import type { Transaction } from 'modules/transactions';
import BudgetGridRow from 'components/BudgetGridRow';
import styles from './style.scss';

type BudgetGridProps = {
  transactions: Transaction[],
  categories: Object,
};

export class BudgetGrid extends React.Component<BudgetGridProps> {
  static defaultProps = {
    transactions: [],
    categories: {},
  };

  changeUrl = (transaction) => {
    const { id, categoryId, description } = transaction;
    this.props.history.push(`/budget/${id}`);
  }

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
          {transactions.map((transaction: Transaction): React.Element<any> => (
            <BudgetGridRow
              changeUrl={this.changeUrl}
              key={transaction.id}
              transaction={transaction}
              categories={categories} />
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

export default withRouter(connect(mapStateToProps)(BudgetGrid));
