// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () => import('containers/BudgetItem' /* webpackChunkName: "budgetitem" */);

type BudgetItemProps = {
  match: Object,
};

class BudgetItem extends Component<BudgetItemProps> {
  render() {
    const { match: { params: { id } } } = this.props;
    return <Chunk load={loadBudgetItemContainer} id={id} />;
  }
}

export default BudgetItem;
