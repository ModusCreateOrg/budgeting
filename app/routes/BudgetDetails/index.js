// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetDetailsContainer = () => import('containers/BudgetDetails' /* webpackChunkName: "budgetDetails" */);

class BudgetDetails extends Component<{}> {
  render() {
    const { match: { params: { id } } } = this.props;
    return <Chunk load={loadBudgetDetailsContainer} id={parseInt(id, 10)} />;
  }
}

export default BudgetDetails;
