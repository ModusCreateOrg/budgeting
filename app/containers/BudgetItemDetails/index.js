// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { injectAsyncReducers } from 'store';
import cx from 'classnames';

import transactionReducer from 'modules/transactions';
import type { Transaction } from 'modules/transactions';

import DonutChart from 'components/DonutChart';

import { getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';

import styles from './styles.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemDetailsProps = {
  transaction: Transaction,
  inflowBalance: Number,
  outflowBalance: Number,
};

class BudgetItemDetails extends React.Component<BudgetItemDetailsProps> {
  getChartData = () => {
    const { transaction } = this.props;
    return [
      { category: 'Total', categoryId: 'TOTAL', value: Math.abs(this.getBalance()) },
      {
        category: transaction.description,
        categoryId: transaction.id,
        value: Math.abs(transaction.value),
      },
    ];
  };

  getBalance = () => {
    if (this.isInflow()) {
      return this.props.inflowBalance;
    }
    return this.props.outflowBalance;
  };

  isInflow = () => this.props.transaction.value >= 0;

  renderBackButton = () => (
    <button onClick={this.props.history.goBack} className={styles.backButton}>
      Back
    </button>
  );

  render() {
    const { transaction } = this.props;

    if (!transaction) {
      return [<div>{this.renderBackButton()}</div>, <div>Item Not Found</div>];
    }

    const isInflow = this.isInflow();

    return (
      <div>
        {this.renderBackButton()}
        <div>{transaction.description}</div>
        <div
          className={cx({
            [styles.inflowBalance]: isInflow,
            [styles.outflowBalance]: !isInflow,
          })}
        >
          {`${isInflow ? '+' : '-'}${Math.round(transaction.value * 100 / this.getBalance())}%`}
        </div>
        <DonutChart isPieChart data={this.getChartData()} dataLabel="category" dataKey="categoryId" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransactionById(state, ownProps.match.params.id),
  inflowBalance: getInflowBalance(state),
  outflowBalance: getOutflowBalance(state),
});

export default compose(withRouter, connect(mapStateToProps))(BudgetItemDetails);
