import React, { PureComponent } from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction' /* webpackChunkName: "budget-item" */);

export default class Transaction extends PureComponent {
  render() {
    const { match } = this.props;
    return <Chunk load={loadTransactionContainer} transactionId={match.params.transactionId} />;
  }
}
