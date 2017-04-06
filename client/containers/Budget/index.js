import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('./BudgetContainer');

class Budget extends Component {
  render() {
    return (
      <Chunk load={loadBudgetContainer}>
        { Comp => Comp && <Comp /> }
      </Chunk>
    );
  }
}

export default Budget;
