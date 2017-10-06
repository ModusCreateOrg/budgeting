// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import { getTransactions, getTotalBudget } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import TransactionDetail from 'components/TransactionDetail';
import { injectAsyncReducers } from 'store';
import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type TransactionProps = {
  transactions: Transaction[],
  totalBudget: number,
};

export class TransactionContainer extends React.Component<TransactionProps> {
  static defaultProps = {
    transactions: [],
  };

  getTransaction(properties) {
    return this.props.transactions.filter(item => {
      let match = true;
      Object.keys(properties).forEach(p => {
        if (item[p] !== properties[p]) match = false;
      });
      return match;
    })[0];
  }

  render() {
    const { history, match, totalBudget } = this.props;
    if (typeof history === 'undefined' || typeof history.goBack !== 'function') {
      throw Error('needs the history object to go back to the previous page');
    }
    const id = match.params.id;
    const notFoundMessage = `Transaction id ${id} not found`;
    let transaction;
    let description;
    try {
      const parsedId = parseInt(id, 10);
      if (!Number.isInteger(parsedId)) throw Error('id cannot be parsed into a number');
      transaction = this.getTransaction({ id: parsedId });
      description = transaction.description;
    } catch (e) {
      // continue regardless of error
    }

    return (
      <div className={styles.transaction}>
        <h3>
          Transaction <br />
          {description}
        </h3>
        <div>
          <button onClick={() => history.goBack()}>Back</button>
        </div>
        {typeof transaction === 'undefined' ? (
          <h4>{notFoundMessage}</h4>
        ) : (
          <TransactionDetail transaction={transaction} totalBudget={totalBudget} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  totalBudget: getTotalBudget(state),
});

export default connect(mapStateToProps)(TransactionContainer);
