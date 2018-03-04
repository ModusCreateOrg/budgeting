// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import type { Transaction } from 'modules/transactions';
import { getTransactions, getTransaction } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';
import formatAmount from 'utils/formatAmount';
import formatToPercentage from 'utils/formatToPercentage';
import { getWorkingBalance } from '../../selectors/transactions';
import NavLink from 'components/NavLink';

injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemProps = {
  transaction: Transaction,
  workingBalance: Number,
};

class BudgetItem extends React.Component<BudgetItemProps> {
  static defaultProps = {
    transaction: {},
    workingBalance: 0,
  };

  goBack(){
    console.log(this.context)
    const { goBack } = this.props.history;
    goBack();
  }
  render() {
    const { transaction, inflow } = this.props;
    const amount = formatAmount(transaction.value);
    const amountCls = amount.isNegative ? styles.neg : styles.pos;
    const itemPercentage = this.getItemPercentage(transaction.value);

    const data = [
      {index: "1", value: (100-itemPercentage).toFixed(2), name: "Total Budget"},
      {index: "2", value: itemPercentage.toFixed(2), name: transaction.description },
    ];
    return (
      <div>
        <NavLink to="/budget" label="Go Back" styles={styles} />
        <div className={styles.headerContent}>{transaction.description}</div>
        <div className={amountCls}>
          <div className={styles.cellContent}>{amount.text}</div>
        </div>
        <DonutChart data={data} valueFormat={value => formatToPercentage(value).text} dataLabel="name" dataKey="index"/>
      </div>
    );
  }

  getItemPercentage(itemValue) {
    const { workingBalance } = this.props;
    return (Math.abs(Number(itemValue))/Number(Math.abs(workingBalance)))*100;
  }
}

const mapStateToProps = (state, props) => {
  return {
    transaction: getTransaction(getTransactions(state), Number(props.itemId)),
    workingBalance: getWorkingBalance(state),
  };
};
export default connect(mapStateToProps)(BudgetItem);
