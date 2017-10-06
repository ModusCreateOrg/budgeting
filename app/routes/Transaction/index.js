// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction' /* webpackChunkName: "transaction" */);

class Transaction extends Component<{}> {
  constructor({ match, history }) {
    super();
    this.match = match;
    this.history = history;
  }
  render() {
    return <Chunk load={loadTransactionContainer} match={this.match} history={this.history} />;
  }
}

export default Transaction;
