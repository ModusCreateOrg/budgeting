// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import NavLink from 'components/NavLink';
import { getTransaction } from 'selectors/transactions';
import styles from './style.scss';

type BudgetItemProps = {
  onTransaction: Function,
  id: Integer,
};

export class BudgetItem extends React.Component<BudgetItemProps> {
  static defaultProps = {
    onTransaction: () => null,
  };

  renderSubtitle() {
    const { id, onTransaction } = this.props;
    const transaction = onTransaction(id);
    const { percentage, isNegative } = transaction;

    return (
      <h4 className={`${styles.budgetSubtitle} ${isNegative ? styles.negative : styles.positive}`}>
        {isNegative ? '-' : '+'}
        {Math.abs(percentage)}%
      </h4>
    );
  }

  render() {
    const { onTransaction, id } = this.props;
    const transaction = onTransaction(id);

    if (!transaction) {
      return <div>No details for this transaction</div>;
    }

    return (
      <div className={styles.budgetItem}>
        <h1 className={styles.budgetTitle}>{transaction.description}</h1>
        {this.renderSubtitle()}
        <hr />
        <NavLink to="/budget" styles={{ navLink: '' }} label={'Back to Budget'} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onTransaction: id => getTransaction(state, id),
});

export default connect(mapStateToProps)(BudgetItem);
