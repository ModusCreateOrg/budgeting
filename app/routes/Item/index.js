// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemContainer = () => import('containers/Item' /* webpackChunkName: "item" */);

class Item extends Component<{}> {
  render() {
    return <Chunk load={loadItemContainer} location={this.props.location} />;
  }
}

export default Item;
