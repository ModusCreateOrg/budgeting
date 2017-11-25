// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getFormattedTransaction } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import type { TransactionFormatted } from 'selectors/transactions';
import BalanceItem from 'components/Balance';
import styles from './style.scss';

type ItemDescriptionProps = {
  transaction: TransactionFormatted,
  itemId: string
};

export class ItemDescription extends React.Component<ItemDescriptionProps> {
  static defaultProps = {
    transaction: {},
  };

  render() {
    const { transaction } = this.props;
    return (
      <div className={styles.item}>
        <h1 className={styles.item__title}>{transaction.description}</h1>
        <div className={styles.item__amountContainer}>
          <BalanceItem amount={transaction.amount} title="" prefix={transaction.amount.isNegative ? '-' : ''}  extraClasses={styles.item__noBorder} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, {itemId}) => {
  return ({
    transaction: getFormattedTransaction(state, itemId),
  });
}


export default connect(mapStateToProps)(ItemDescription);
