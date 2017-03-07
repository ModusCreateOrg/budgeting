import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 

import Header from 'components/Header';
import * as AppActions from 'actions';
import './style.scss';

const Budget = () => <h1>Budget</h1>;
const Reports = () => <h1>Reports</h1>;

class App extends Component {
  componentWillMount() {
    const { transactions, categories } = this.props;

    transactions.forEach(trans => console.log(trans, categories[trans.categoryId]));
  }

  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route path="/budget" component={Budget} />
          <Route path="/reports" component={Reports} />
          <Redirect to="/budget" />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { transactions } = state;

  return {
    transactions: transactions.transactions,
    categories: transactions.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);