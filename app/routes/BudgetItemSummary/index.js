import React from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemSummary = () => import('containers/BudgetItemSummary' /* webpackChunkName: "itemsummary" */);

const BudgetItemSummary = () => <Chunk load={loadBudgetItemSummary} />;

export default BudgetItemSummary;
