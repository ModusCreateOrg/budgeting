// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('containers/Item' /* webpackChunkName: "item" */);

class Item extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetContainer} />;
  }
}

export default Item;
