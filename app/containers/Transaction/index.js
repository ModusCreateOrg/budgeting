// @flow
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  getInflowBalance, getOutflowBalance, getTransactions,
  getInflowTransactions, getOutflowTransactions,
} from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import DonutChart from 'components/DonutChart';
import styles from './styles.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

const NUMBER_OF_DECIMALS = 2;

class Transaction extends React.Component {
  render() {
    const { inflowBalance, outflowBalance, transactions } = this.props;
    const { match: { params: { id } } } = this.props;
    const transaction = transactions.find(trans => trans.id === Number(id));
    const balance = transaction.value < 0 ? outflowBalance : inflowBalance;
    const reducedTransactions = [
      { id: transaction.description, value: Math.abs(transaction.value) },
      {
        id: `Other ${transaction.value < 0 ? 'outflow' : 'inflow'}`,
        value: Math.abs(balance) - Math.abs(transaction.value),
      },
    ];

    return (
      <div>
        <h1>{transaction.description}</h1>
        <h2
          className={classNames({
            [styles.positive]: transaction.value >= 0,
            [styles.negative]: transaction.value < 0,
          })}
        >
          {transaction.value < 0 && '-'}
          {`${Number(transaction.value * 100 / balance).toFixed(NUMBER_OF_DECIMALS)}%`}
        </h2>
        <DonutChart data={reducedTransactions} dataLabel="id" dataKey="id" />
        <Link to="/budget">Back</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inflowBalance: getInflowBalance(state),
  outflowBalance: getOutflowBalance(state),
  transactions: getTransactions(state),
});

export default connect(mapStateToProps)(Transaction);
