import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as AppActions } from 'modules/transactions';
import Chunk from 'components/Chunk';

const loadBudgetGrid = () => import('components/BudgetGrid');

@connect(
  ({ transactions, categories }) => ({
    transactions,
    categories
  }),
  (dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
  }))
)
class Budget extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired
  }

  render() {
    const { transactions, categories } = this.props;
    const data = { transactions, categories };

    return (
      <Chunk load={loadBudgetGrid}>
        { Comp => Comp && <Comp data={data} /> }
      </Chunk>
    );
  }
}

export default Budget;
