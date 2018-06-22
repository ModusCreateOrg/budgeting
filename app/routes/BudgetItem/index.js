// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () => import('containers/BudgetItem' /* webpackChunkName: "budgetitem" */);

class BudgetItem extends Component<{}> {
  render() {
    return <Chunk {...this.props} load={loadBudgetItemContainer} />;
  }
}

export default BudgetItem;
