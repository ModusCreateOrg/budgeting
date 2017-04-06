import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import transactionReducer, { actions as AppActions } from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { getTransactions } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import { getCategories } from 'selectors/categories';
import BudgetGrid from 'components/BudgetGrid';
import Balance from 'containers/Balance';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

const BudgetContainer = ({ transactions, categories }) => (
  <section>
    <BudgetGrid data={{ transactions, categories }} />
    <Balance />
  </section>
);

BudgetContainer.propTypes = {
  transactions: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    transactions: getTransactions(state),
    categories: getCategories(state)
  }),
  (dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
  }))
)(BudgetContainer);
