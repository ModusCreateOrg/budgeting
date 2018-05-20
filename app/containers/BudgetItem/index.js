// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getTransactionById, getOutflowBalance, getInflowBalance } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import type { Transaction } from 'modules/transactions';
import BudgetItemDetail from 'components/BudgetItemDetail';

import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemContainerProps = {
  id: number, // eslint-disable-line react/no-unused-prop-types
  transaction: Transaction,
  balance: number,
};

export class BudgetItemContainer extends React.Component<BudgetItemContainerProps> {
  static defaultProps = {
    id: 0,
    transaction: {},
    balance: 0,
  };

  render() {
    const { transaction, balance } = this.props;

    // Handle cases when a non-existent transaction ID was set in the URL.
    if (!transaction.value) {
      return <Redirect to="/budget" />;
    }

    return (
      <section className={styles.budgetItem}>
        <Link to="/budget" className={styles.backButton}>
          Back
        </Link>
        <BudgetItemDetail transaction={transaction} balance={balance} />
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = parseInt(props.id, 10);
  const transaction = getTransactionById(state, id) || {};
  const balance = transaction.value < 0 ? getOutflowBalance(state) : getInflowBalance(state);
  return {
    transaction,
    balance,
  };
};

export default connect(mapStateToProps)(BudgetItemContainer);
