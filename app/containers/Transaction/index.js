// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import transactionReducer from 'modules/transactions';
import { getTransactions, getTotalBalance } from 'selectors/transactions';
import type {Transaction} from 'modules/transactions';
import TransactionDetail from 'components/TransactionDetail';
import { injectAsyncReducers } from 'store';
import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer
});

type TransactionProps = {
  transactions: Transaction[],
  totalBalance: number
};

export class TransactionContainer extends React.Component<TransactionProps> {
  static defaultProps = {
    transactions: []
  };

  getTransaction (properties) {
    return this.props.transactions.filter(item => {
      let match = true;
      for (let p in properties) if (item[p] !== properties[p]) match = false;
      return match;
    })[0];
  }

  render() {
    const {history, match, transactions, totalBalance} = this.props;
    const id = match.params.id;
    const notFoundMessage = `Transaction id ${id} not found`;
    let transaction;
    let pageTitle = '';
    try {
      const parsedId = parseInt(id);
      if (! Number.isInteger(parsedId)) throw Error('id cannot be parsed into a number');
      transaction = this.getTransaction({id: parsedId});
      pageTitle = `Transaction ${transaction.description}`;
    } catch (e) {
    }

    return (
      <div className={styles.transaction}>
        <h3>{pageTitle}</h3>
        <div>
          <button onClick={() => history.goBack()}>Back</button>
        </div>
      {
      typeof transaction === 'undefined'
        ?

        <h4>{notFoundMessage}</h4>

        :

        <TransactionDetail transaction={transaction} totalBalance={totalBalance}/>
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  totalBalance: getTotalBalance(state)
});

export default connect(mapStateToProps)(TransactionContainer);

