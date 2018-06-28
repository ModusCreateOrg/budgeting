// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadTransactionModalContainer = () => import('components/TransactionModal');

const TransactionModal = props => <Chunk load={loadTransactionModalContainer} {...props} />;

export default TransactionModal;
