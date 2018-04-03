// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemContainer = () => import('containers/Transaction' /* webpackChunkName: "transaction" */);

class Transaction extends Component<{}> {
  render() {
    return <Chunk load={loadItemContainer} />;
  }
}

export default Transaction;
