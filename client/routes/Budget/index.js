import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('containers/Budget');

class Budget extends Component {
  render() {
    return (
      <Chunk load={loadBudgetContainer} />
    );
  }
}

export default Budget;
