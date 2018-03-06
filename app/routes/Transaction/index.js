// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const transactionDetailsPanel = () => import('components/TransactionPanel' /* webpackChunkName: "reports" */);

const Transaction = () => <Chunk load={transactionDetailsPanel}/>;

export default Transaction;
