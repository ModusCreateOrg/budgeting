// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import {
  getTransactions,
  getTransactionById,
  getTransactionIdFromLocation,
  getInflowByCategoryName,
  getOutflowByCategoryName,
} from 'selectors/transactions';
import { injectAsyncReducers } from 'store';

import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

class Item extends React.Component<ItemProps> {
  renderOutflow(transaction) {
    const { outflows } = this.props;
    let component = null;

    const outflow = outflows.find(item => item.categoryId === transaction.categoryId);

    if (outflow) {
      component = (
        <div>
          <span className={styles.minusSign}>-</span>outflow: {outflow.value}
        </div>
      );
    }

    return component;
  }

  renderInflow(transaction) {
    const { inflows } = this.props;
    let component = null;

    const inflow = inflows.find(item => item.categoryId === transaction.categoryId);

    if (inflow) {
      component = (
        <div>
          <span className={styles.plusSign}>+</span>inflow: {inflow.value}
        </div>
      );
    }

    return component;
  }

  render() {
    const { transactions, location } = this.props;

    const id = getTransactionIdFromLocation(location.pathname);
    const transaction = getTransactionById(transactions, id);

    return (
      <div>
        <h1>{transaction.description}</h1>
        <h2>
          {this.renderInflow(transaction)}
          {this.renderOutflow(transaction)}
        </h2>
        {JSON.stringify(transaction)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflows: getInflowByCategoryName(state),
  outflows: getOutflowByCategoryName(state),
});

export default connect(mapStateToProps)(Item);
