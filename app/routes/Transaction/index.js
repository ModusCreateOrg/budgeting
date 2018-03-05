// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadReportsPanel = () => import('components/TransactionDetails' /* webpackChunkName: "reports" */);

const Transaction = () => <Chunk load={loadReportsPanel}/>;

export default Transaction;
