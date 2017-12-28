// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import { getCategories } from 'selectors/categories';
import DonutChart from 'components/DonutChart';
import styles from './styles.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

class Item extends Component<{}> {
  static defaultProps = {
    transactions: [],
    categories: {},
    inflowBalance: 0,
    outflowBalance: 0,
  };

  // returns the color of the percentage
  getPercentageClass() {
    let balance = 0;
    if (this.props.transactions[this.props.match.params.id - 1]) {
      balance = this.props.transactions[this.props.match.params.id - 1].value;
    }

    if (balance >= 0) {
      // this is green
      return styles.green;
    }

    // this is red
    return styles.red;
  }

  // returns the percentage
  getPercentage() {
    // get the balance first
    let balance = 0;
    if (this.props.transactions[this.props.match.params.id - 1]) {
      balance = Math.abs(this.props.transactions[this.props.match.params.id - 1].value);
    }

    if (balance >= 0) {
      // if it is inflow
      return (balance / this.props.inflowBalance * 100).toFixed(2);
    }

    // if it is outflow
    return (balance / this.props.outflowBalance * 100).toFixed(2);
  }

  // gets / returns data for the pie chart
  getData() {
    let name = '';
    let balance = 0;
    if (this.props.transactions[this.props.match.params.id - 1]) {
      name = this.props.categories[this.props.transactions[this.props.match.params.id - 1].categoryId];
      balance = Math.abs(this.props.transactions[this.props.match.params.id - 1].value);
    }
    return [
      {
        category: name,
        value: balance,
      },
      { category: 'Entire Budget', value: this.props.inflowBalance },
    ];
  }

  // gets the browser back using it's history
  goBack() {
    window.history.back();
  }

  render() {
    let name = '';
    let description = '';
    if (this.props.transactions[this.props.match.params.id - 1]) {
      name = this.props.categories[this.props.transactions[this.props.match.params.id - 1].categoryId];
      description = this.props.transactions[this.props.match.params.id - 1].description;
    }

    return (
      <section className={styles.item_container}>
        <button className={styles.back_button} onClick={this.goBack}>
          Go Back
        </button>
        <h1>{name}</h1>
        <h2>{description}</h2>
        <h4 className={this.getPercentageClass()}>{this.getPercentage()}%</h4>
        <DonutChart data={this.getData()} dataLabel="category" dataKey="categoryId" />
      </section>
    );
  }
}

// map state to props
const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
  inflowBalance: getInflowBalance(state),
  outflowBalance: getOutflowBalance(state),
});

export default connect(mapStateToProps)(Item);
