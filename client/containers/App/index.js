import React, { Component, PropTypes } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Budget from 'containers/Budget';
import * as AppActions from 'actions';
import './style.scss';

const Reports = () => <h1>Reports</h1>;

class App extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    categories: PropTypes.object
  }

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
