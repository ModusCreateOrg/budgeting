// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransaction = () => import('containers/Transaction');

class Transaction extends Component<{}> {
  render() {
    const { match } = this.props;
    return <Chunk load={loadTransaction} match={match} />;
  }
}

export default Transaction;
