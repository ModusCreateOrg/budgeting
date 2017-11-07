// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import BudgetItem from './item';

const loadBudgetContainer = () => import('containers/Budget' /* webpackChunkName: "budget" */);

class Budget extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetContainer} />;
  }
}

export { BudgetItem };

export default Budget;
