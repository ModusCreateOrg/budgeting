// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('containers/Detail' /* webpackChunkName: "budget" */);

class Detail extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetContainer} />;
  }
}

export default Detail;
