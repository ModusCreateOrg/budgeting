// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadTransactionModalContainer = () => import('components/TransactionModal');

const TransactionModal = () => <Chunk load={loadTransactionModalContainer} />;

export default TransactionModal;
