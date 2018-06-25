// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('containers/Budget' /* webpackChunkName: "budget", webpackPrefetch: true */);

class Budget extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetContainer} />;
  }
}

export default Budget;
