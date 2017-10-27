// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/TransactionPage' /* webpackChunkName: "transaction" */);

export default class Transaction extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionContainer} />;
  }
}
