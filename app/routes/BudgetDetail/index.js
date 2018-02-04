// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const budgetDetailContainer = () => import('containers/BudgetDetail' /* webpackChunkName: "detail" */);

const BudgetDetail = () => <Chunk load={budgetDetailContainer} />;

export default BudgetDetail;
