// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionBudgetContainer = () => import('containers/TransactionBudget' /* webpackChunkName: "transactionbudget" */);

class TransactionBudget extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionBudgetContainer} />;
  }
}

export default TransactionBudget;
