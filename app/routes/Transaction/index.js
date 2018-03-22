// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction' /* webpackChunkName: "transaction" */);

type TransactionProps = {
  match: Object<Object<Number>>
}

class Transaction extends Component<TransactionProps, {}> {
  render() {
    return <Chunk load={loadTransactionContainer} {...this.props} />;
  }
}

export default Transaction;
