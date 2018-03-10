// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction' /* webpackChunkName: "Transaction" */);

class Transaction extends Component<{}> {
  render() {
    const { match: { params: { id } } } = this.props;
    return <Chunk load={loadTransactionContainer} transaction={id} />;
  }
}

export default Transaction;
