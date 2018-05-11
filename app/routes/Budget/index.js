// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('containers/Budget' /* webpackChunkName: "budget" */);

class Budget extends Component<{}> {
  onClickItem(id) {
    this.props.history.push(`/item/${id}`);
  }

  render() {
    return (
      <Chunk
        load={loadBudgetContainer}
        onClickItem={id => {
          this.onClickItem(id);
        }}
      />
    );
  }
}

export default Budget;
