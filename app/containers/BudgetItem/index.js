// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import NavLink from 'components/NavLink';
import type { FormattedAmount } from 'utils/formatAmount';
import { getTransactions } from 'selectors/transactions';
import {
  TransactionSummary,
  getTransaction,
} from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';

type BudgetItemProps = {
  transactions: Transaction[],
  transaction: TransactionSummary[]
};

export class BudgetItem extends React.Component<BudgetItemProps> {
  static defaultProps = {
    transactions: [],
    getTransaction: () => null
  };

  renderSubtitle() {
    const { balance, id, getTransaction } = this.props;
    const transaction = getTransaction(id);
    const { value, percentage, isNegative } = transaction;

    return (
      <h4 className={styles.budgetSubtitle}>
        <span className={`${isNegative ? styles.negative : styles.positive}`}>
          {isNegative ? '-' : '+'}
        </span>
        &nbsp;
        {Math.abs(percentage)}%
      </h4>
    );
  };

  render() {
    const { getTransaction, id } = this.props;
    const transaction = getTransaction(id);

    if (!transaction) {
      return (
        <div>No details for this transaction</div>
      );
    }

    return (
      <div className={styles.budgetItem}>
        <h1 className={styles.budgetTitle}>{transaction.description}</h1>
        {this.renderSubtitle()}
        <hr />
        <NavLink to='/budget' styles={{navLink: ''}} label={'Back to Budget'} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getTransaction: (id) => getTransaction(state, id)
});

export default connect(mapStateToProps)(BudgetItem);
