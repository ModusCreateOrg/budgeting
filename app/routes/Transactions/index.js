// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionDetailContainer = () =>
  import('containers/TransactionDetail' /* webpackChunkName: "transactionDetail" */);

class TransactionDetail extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionDetailContainer} />;
  }
}

export default TransactionDetail;
