// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction' /* webpackChunkName: "transaction" */);

class Transaction extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionContainer} {...this.props} />;
  }
}

export default Transaction;
