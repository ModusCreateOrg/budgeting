// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import { withRouter } from 'react-router-dom'
import TransactionBudgetHeader from 'components/TransactionBudgetHeader/index'
import styles from './style.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

@withRouter
export default class TransactionBudgetContainer extends React.Component {
  render() {
    const { match: { params }, history } = this.props;
    return (
      <section>
        <TransactionBudgetHeader transactionId={params.transactionid} />
        <button className={styles.backbutton} onClick={history.goBack}>Back</button>
      </section>
    );
  }
}

