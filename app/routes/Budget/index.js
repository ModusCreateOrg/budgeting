// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('components/Budget' /* webpackChunkName: "budget" */);

class Budget extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetContainer} />;
  }
}

export default Budget;
