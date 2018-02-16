// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import type { Match } from 'react-router-dom';

const loadBudgetItemDetailsContainer = () =>
  import('containers/BudgetItemDetails' /* webpackChunkName: "budget-item-details" */);

type BudgetItemDetailsProps = {
  match: Match,
};

class BudgetItemDetails extends Component<BudgetItemDetailsProps> {
  render() {
    const { match } = this.props;

    return <Chunk load={loadBudgetItemDetailsContainer} match={match} />;
  }
}

export default BudgetItemDetails;
