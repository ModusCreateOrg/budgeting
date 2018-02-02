// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () => import('containers/BudgetItem' /* webpackChunkName: "budget-item" */);

class BudgetItem extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetItemContainer} {...this.props.match.params} />;
  }
}

export default BudgetItem;
