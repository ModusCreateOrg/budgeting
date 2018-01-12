// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemContributionContainer = () =>
  import('containers/ItemContribution' /* webpackChunkName: "item-contribution" */);

class ItemContribution extends Component<{}> {
  render() {
    return <Chunk load={loadItemContributionContainer} />;
  }
}

export default ItemContribution;
