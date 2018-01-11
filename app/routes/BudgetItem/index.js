// @flow
import React from 'react';
import Chunk from 'components/Chunk';
import { type Match } from 'react-router';

const loadBudgetItem = () => import('containers/BudgetItem' /* webpackChunkName: "budgetItem" */);
const BudgetItem = ({ match }: Match) => <Chunk {...{ load: loadBudgetItem, id: match.params.id }} />;

export default BudgetItem;
