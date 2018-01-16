import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContributionPanel = () => import('containers/BudgetContribution' /* webpackChunkName: "budgetcontribution"*/ );

const BudgetContribution = () => <Chunk load= {loadBudgetContributionPanel}/>;

export default BudgetContribution;