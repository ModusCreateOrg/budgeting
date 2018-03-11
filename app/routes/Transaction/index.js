// @flow
import React, { Component } from 'react';
import type { RouteProps } from 'types';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction' /* webpackChunkName: "Transaction" */);

class Transaction extends Component<RouteProps> {
  render() {
    const { match: { params: { id } } } = this.props;
    return <Chunk load={loadTransactionContainer} id={parseInt(id, 10)} />;
  }
}

export default Transaction;
