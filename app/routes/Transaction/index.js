// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('containers/Transaction');

const Transaction = () => <Chunk load={loadTransactionContainer} />;

export default Transaction;
