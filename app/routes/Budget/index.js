// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';
import type RouterHistory from 'react-router';

const loadBudgetContainer = () => import('containers/Budget' /* webpackChunkName: "budget" */);

class Budget extends Component<{ history: RouterHistory }> {
  render() {
    return <Chunk load={loadBudgetContainer} history={this.props.history} />;
  }
}

export default Budget;
