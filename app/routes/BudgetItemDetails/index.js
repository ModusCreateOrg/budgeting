// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () =>
  import('containers/BudgetItemDetails' /* webpackChunkName: "budgetItemDetails" */);

class BudgetItemDetails extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetItemContainer} />;
  }
}

export default BudgetItemDetails;
