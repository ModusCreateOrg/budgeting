// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () => import('containers/BudgetItem' /* webpackChunkName: "budgetItem" */);

class BudgetItem extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetItemContainer} />;
  }
}

export default BudgetItem;
