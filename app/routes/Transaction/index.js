// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('components/Transaction');

const Transaction = () => <Chunk load={loadTransactionContainer} />;

export default Transaction;
