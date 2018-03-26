// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetDetailContainer = () => import('containers/BudgetDetail' /* webpackChunkName: "budgetDetail" */);

class BudgetDetail extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetDetailContainer} {...this.props} />;
  }
}

export default BudgetDetail;
