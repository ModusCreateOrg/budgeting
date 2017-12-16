// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import { type Match } from 'react-router';

const loadBudgetItemContainer = () => import('containers/BudgetItem' /* webpackChunkName: "budgetItem" */);

class BudgetItem extends Component<{ match: Match }> {
  render() {
    return <Chunk load={loadBudgetItemContainer} id={this.props.match.params.id} />;
  }
}

export default BudgetItem;
