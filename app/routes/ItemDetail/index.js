// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemDetailContiner = () => import('containers/Item');

class ItemDetail extends Component<{}> {
  render() {
    return <Chunk load={loadItemDetailContiner} />;
  }
}

export default ItemDetail;
