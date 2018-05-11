// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemContainer = () => import('containers/Item' /* webpackChunkName: "item" */);

class Item extends Component<{}> {
  onClickBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Chunk
        load={loadItemContainer}
        location={this.props.location}
        onClickBack={() => {
          this.onClickBack();
        }}
      />
    );
  }
}

export default Item;
