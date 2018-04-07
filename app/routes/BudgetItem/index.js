// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () => import('components/BudgetItem' /* webpackChunkName: "budgetitem" */);

const BudgetItem = ({ match }) => <Chunk load={loadBudgetItemContainer} budgetItemId={match.params.id} />;

export default BudgetItem;
