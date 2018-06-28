// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadTransactionContainer = () => import('components/Transaction');

const Transaction = props => <Chunk load={loadTransactionContainer} {...props} />;

export default Transaction;
