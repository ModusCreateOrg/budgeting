// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, type RouterHistory } from 'react-router';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'containers/EntryFormRow';
import type { Transaction } from 'modules/transactions';
import BudgetGridRow from 'components/BudgetGridRow';
import styles from './style.scss';

type BudgetGridProps = {
  transactions: Transaction[],
  categories: Object,
  history: RouterHistory,
};

export class BudgetGrid extends React.Component<BudgetGridProps> {
  static defaultProps = {
    transactions: [],
    categories: {},
  };

  onRowClick = (id: number) => {
    this.props.history.push(`/item-contribution/${id}`);
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
          {transactions.map((transaction: Transaction): React.Element<any> => (
            <BudgetGridRow
              key={transaction.id}
              transaction={transaction}
              categories={categories}
              onClick={() => this.onRowClick(transaction.id)}
            />
          ))}
        </tbody>
        <tfoot>
          <EntryFormRow />
        </tfoot>
      </table>
    );
  }
}

const mapStateToProps = (state, ownProps): BudgetGridProps => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
  history: ownProps.history,
});

export default withRouter(connect(mapStateToProps)(BudgetGrid));
