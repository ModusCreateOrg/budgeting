// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemBudgetContributionContainer = () =>
  import('containers/ItemBudgetContribution' /* webpackChunkName: "itemcontribution" */);

class ItemContribution extends Component<{}> {
  render() {
    const { match } = this.props;
    return <Chunk load={loadItemBudgetContributionContainer} match={match} />;
  }
}

export default ItemContribution;
