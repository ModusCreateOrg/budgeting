import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as AppActions } from 'modules/transactions';
import Chunk from 'components/Chunk';

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
      <Chunk load={() => import('components/BudgetGrid')}>
        { Comp => (Comp ? <Comp data={data} /> : null) }
      </Chunk>
    );
  }
}

export default Budget;
