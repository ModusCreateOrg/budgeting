// @flow
import { withRouter } from 'react-router-dom';
import { injectAsyncReducers } from 'store';
import { connect } from 'react-redux';
import BudgetItem from 'components/BudgetItem';
import type { Transaction } from 'modules/transactions';
import transactionReducer from 'modules/transactions';
import { getTransaction, getTransactionContribution } from 'selectors/transactions';

injectAsyncReducers({
  transactions: transactionReducer,
});

//pass the history handler to the component so the button will be able to call it
const mapDispatchToProps = (dispatch, props) => ({
  goBackHandler: props.history.goBack,
});

const mapStateToProps = (state, props) => {
  const transaction: Transaction = getTransaction(state, props.match.params.id);
  const contribution = getTransactionContribution(state, props.match.params.id);

  return {
    transaction: transaction,
    contribution: contribution,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetItem);
