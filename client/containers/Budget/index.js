import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  actions as AppActions,
  getTransactions
} from 'modules/transactions';

import { getCategories } from 'modules/categories';

import BudgetGrid from 'components/BudgetGrid';

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
      <div>
        <BudgetGrid data={data} />
      </div>
    );
  }
}

export default Budget;
