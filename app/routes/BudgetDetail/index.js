// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetDetailContainer = () => import('containers/Transaction' /* webpackChunkName: "budget" */);

class BudgetDetail extends Component {
  render() {
    const { match } = this.props;
    return <Chunk load={loadBudgetDetailContainer} budgetId={match.params.budgetId} />;
  }
}

export default BudgetDetail;
