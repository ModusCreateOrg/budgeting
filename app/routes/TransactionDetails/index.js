import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionDetailsContainer = () =>
  import('containers/TransactionDetails' /* webpackChunkName: "transactiondetails" */);

class TransactionDetails extends Component<{}> {
  render() {
    return <Chunk load={loadTransactionDetailsContainer} match={this.props.match} />;
  }
}

export default TransactionDetails;
