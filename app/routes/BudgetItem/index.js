import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetItemContainer = () => import('containers/BudgetItem');

class BudgetItem extends Component<{}> {
  render() {
    return <Chunk load={loadBudgetItemContainer} itemId={this.props.match.params.itemId} />;
  }
}

export default BudgetItem;
