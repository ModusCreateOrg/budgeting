import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Grid from 'components/Grid';
import TransactionForm from 'containers/TransactionForm';
import TransactionSummary from 'containers/TransactionSummary';
import * as AppActions from 'actions';
import './style.css';

class App extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    summary: PropTypes.object,
    gridFields: PropTypes.array,
    actions: PropTypes.object
  };

  componentWillMount() {
    const { transactions, actions } = this.props;
    actions.requestSum(transactions);
  }

  render() {
    const {
      transactions,
      gridFields,
      summary,
      actions
    } = this.props;

    return (
      <div className="viewport">
        <Header addTodo={actions.addTodo} />
        <Grid fields={gridFields} data={transactions}>
          <TransactionForm action={actions.addTransaction}/>
          <TransactionSummary data={summary} fields={gridFields} />
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { transactions } = state;
  return {
    transactions: transactions.transactions,
    summary: transactions.summary,
    gridFields: transactions.transactionsGrid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
