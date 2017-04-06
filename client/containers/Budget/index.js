import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as AppActions } from 'modules/transactions';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import Chunk from 'components/Chunk';

const loadBudgetContainer = () => import('./BudgetContainer');

@connect(
  state => ({
    transactions: getTransactions(state),
    categories: getCategories(state)
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
      <Chunk load={loadBudgetContainer}>
        { Comp => Comp && <Comp data={data} /> }
      </Chunk>
    );
  }
}

export default Budget;
