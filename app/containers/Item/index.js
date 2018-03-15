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
import DonutChart from '../../components/DonutChart';

import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

class Item extends React.Component<ItemProps> {
  renderGraph(isTransactionInflow) {
    const { transactions } = this.props;

    let data = transactions.filter(t => t.value < 0);

    if (isTransactionInflow) {
      data = transactions.filter(t => t.value > 0);
    }

    const parsed = data.map(transaction => {
      const t = {
        ...transaction,
      };

      t.value = Math.abs(t.value);

      return t;
    });

    return <DonutChart data={parsed} dataLabel="description" dataKey="id" />;
  }

  renderInflowOutflow(id, transaction, isTransactionInflow) {
    const { transactions } = this.props;

    const label = isTransactionInflow ? 'inflow' : 'outflow';
    const result = transactions.find(item => item.categoryId === transaction.categoryId);

    let component = null;
    let sign = <span className={styles.minusSign}>-</span>;

    if (isTransactionInflow) {
      sign = <span className={styles.plusSign}>+</span>;
    }

    if (result) {
      component = (
        <div>
          {sign}
          {label}: {result.value}
        </div>
      );
    }

    return component;
  }

  render() {
    const { transactions } = this.props;

    const id = getTransactionIdFromLocation(location.pathname);
    const transaction = getTransactionById(transactions, id);
    const isTransactionInflow = transaction.value > 0;

    return (
      <div>
        <h1>{transaction.description}</h1>
        <h2>{this.renderInflowOutflow(id, transaction, isTransactionInflow)}</h2>
        <div>{this.renderGraph(isTransactionInflow)}</div>
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
