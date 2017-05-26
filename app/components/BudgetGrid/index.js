// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import EntryFormRow from 'components/EntryFormRow';
import type { Transaction } from 'modules/transactions';
import BudgetGridRow from './BudgetGridRow';
import styles from './style.scss';

type Props = {
  transactions: Transaction[],
  categories: Object,
};

@connect(state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
}))
export default class BudgetGrid extends Component<Props, Props, void> {
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
          {transactions.map((transaction: Transaction): React$Element<any> => (
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
