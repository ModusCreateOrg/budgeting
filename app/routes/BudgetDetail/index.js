// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetDetailContainer = () => import('containers/BudgetDetail' /* webpackChunkName: "budget" */);

class BudgetDetail extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetDetailContainer} />;
  }
}

export default BudgetDetail;
