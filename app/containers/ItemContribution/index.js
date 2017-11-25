// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Transaction } from 'modules/transactions';
import { getTransaction, getTotalByTransactionType } from 'selectors/transactions';
import PercentPieChart from 'components/PercentPieChart';
import styles from './style.scss';

type ItemContributionProps = {
  transaction: Transaction,
  total: number,
};

export class ItemDescription extends React.Component<ItemContributionProps> {
  static defaultProps = {
    transaction: {},
    total: 0
  };

  render() {
    const { total, transaction } = this.props;
    return (
      <div className={styles.itemContribution}>
        <PercentPieChart total={total} values={[transaction.value]} />
      </div>
    );
  }
}

const mapStateToProps = (state, {itemId}) => ({
  transaction: getTransaction(state, itemId),
  total: getTotalByTransactionType(state, itemId)
});

export default connect(mapStateToProps)(ItemDescription);