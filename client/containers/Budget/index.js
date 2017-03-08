import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';
import BudgetGrid from 'components/BudgetGrid';

@connect(
  ({ transactions }) => ({
    transactions: transactions.transactions,
    categories: transactions.categories
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
        <h1>Budget</h1>
        <BudgetGrid data={data} />
      </div>
    );
  }
}

export default Budget;
