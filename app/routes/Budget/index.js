// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('containers/Budget' /* webpackChunkName: "budget" */);

class Budget extends Component<{}> {
  render() {
    return <Chunk history={this.props.history} load={loadBudgetContainer} />;
  }
}

export default Budget;
