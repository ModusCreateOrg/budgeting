// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const BudgetRowDetailsContainer = () => import('containers/BudgetRowDetails');

class BudgetRowDetails extends Component<{}> {
  render() {
    return <Chunk load={BudgetRowDetailsContainer} {...this.props} />;
  }
}

export default BudgetRowDetails;
