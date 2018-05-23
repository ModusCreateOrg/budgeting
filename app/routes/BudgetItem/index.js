// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItem = () => import('containers/BudgetItem' /* webpackChunkName: "budgetItem" */);

class BudgetItem extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetItem} />;
  }
}

export default BudgetItem;
