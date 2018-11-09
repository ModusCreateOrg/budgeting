// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionDetail = () => import('containers/TransactionDetail');

class Transaction extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionDetail} id={this.props.match.params.id} />;
  }
}

export default Transaction;
