// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransaction } from 'selectors/transactions';
import PieChart from 'components/PieChart';
import styles from './style.scss';

type BudgetItemProps = {
  onTransaction: Function,
  id: Integer,
};

export class BudgetItem extends React.Component<BudgetItemProps> {
  static defaultProps = {
    onTransaction: () => null,
  };

  handleBack() {
    const { history } = this.props;

    return history ? history.goBack() : false;
  }

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
        <PieChart data={transaction.chartData || []} dataKey="transactionId" innerRatio={700} />
        <hr />
        <button onClick={() => this.handleBack()}>&lsaquo; Back to Budget</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onTransaction: id => getTransaction(state, id),
});

export default connect(mapStateToProps)(BudgetItem);
