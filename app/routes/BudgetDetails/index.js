// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetDetailsContainer = () => import('containers/BudgetDetails' /* webpackChunkName: "budget" */);

class BudgetDetails extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetDetailsContainer} {...this.props} />;
  }
}

export default BudgetDetails;
