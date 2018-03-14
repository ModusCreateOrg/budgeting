// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionDetailPanel = () => import('components/TransactionDetailPanel');

class TransactionDetail extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionDetailPanel} />;
  }
}

export default TransactionDetail;
