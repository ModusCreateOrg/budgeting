// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from 'modules/transactions'
import { getTransactions } from "selectors/transactions";
import type { Transaction } from "modules/transactions";
import transactionReducer from "modules/transactions";
import { injectAsyncReducers } from "store";
import TransactionDetail from "components/TransactionDetail"


// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});


type Props = {
  match: {
    params: {
      id: number
    }
  },
  transactions: Transaction[]
};

class BudgetDetail extends React.Component <Props > {
  getTranscation = (): React.Element<any> => {
    const id = this.props.match.params.id;
    const transaction = this.props.transactions.filter(transaction => {
     return transaction.id == id;
    }
    )
    console.log(transaction)
    return transaction.map((item: Transaction )=> (
      <TransactionDetail value={item.value} key={item.id} title={item.description} />
    ))
  }
  render() {
    return <div>{this.getTranscation()}</div>;
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state)
});
export default connect(mapStateToProps)(BudgetDetail);


