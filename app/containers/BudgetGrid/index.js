// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'containers/EntryFormRow';
import type { Transaction } from 'modules/transactions';
import BudgetGridRow from 'components/BudgetGridRow';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import styles from './style.scss';

type BudgetGridProps = {
  transactions: Transaction[],
  categories: Object,
  push: (route: string) => void,
};

export class BudgetGrid extends React.Component<BudgetGridProps> {
  static defaultProps = {
    transactions: [],
    categories: {},
    push: () => {},
  };

  onGridItemSelected = (itemId: number) => {
    this.props.push(`/budget/items/${itemId}`);
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
              onClick={this.onGridItemSelected}
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

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  push: route => history.push(route),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BudgetGrid));
