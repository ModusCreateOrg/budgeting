// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import { getTransaction, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import PieChart from 'components/PieChart';
import BudgetItemHeader from 'components/BudgetItemHeader';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemSummaryProps = {
  transaction: Transaction,
  balance: number,
  goBack: void => void,
};

/**
 * Generates transaction data in format to be consumed by PieChart
 * 
 * @param {TransactionSummary} transaction 
 * @param {number} totalBalance 
 * @returns {Transaction[]} 
 * @memberof BudgetItemSummary
 */
const getBudgetChartData = (transaction: TransactionSummary, totalBalance: number): Transaction[] => {
  const trans = { ...transaction };
  trans.value = Math.abs(trans.value);
  return [trans].concat([
    {
      description: totalBalance > 0 ? 'Other Income' : 'Other Expenses',
      id: Math.ceil(Math.random() * 255) + 255,
      value: Math.abs(totalBalance) - Math.abs(transaction.value),
    },
  ]);
};

/**
 * BudgetItemSummary Renders details of an individual transaction.
 * It includes the percentage that the transaction contributes in relation
 * to the aggregate of there transactions in that currency flow {inflow | outflow}
 * 
 * @class BudgetItemSummary
 * @extends {React.Component<BudgetItemSummaryProps>}
 */
class BudgetItemSummary extends React.Component<BudgetItemSummaryProps> {
  render() {
    const { balance, transaction, goBack } = this.props;
    const data = getBudgetChartData(transaction, balance);
    return (
      <section className={styles.budgetItemSummary}>
        <button onClick={goBack}>Back</button>
        <BudgetItemHeader transaction={transaction} balance={balance} />
        <PieChart data={data} dataLabel="description" dataKey="id" />;
      </section>
    );
  }
}

const mapStateToProps = (state, { match, history }) => {
  const transactionId = Number(match.params.id);
  const transaction = getTransaction(state, transactionId);
  const balance = transaction.value > 0 ? getInflowBalance(state) : getOutflowBalance(state);
  return {
    transaction,
    balance,
    goBack: () => history.goBack(),
  };
};

export { BudgetItemSummary }; // exported unwrapped for testing

export default withRouter(connect(mapStateToProps)(BudgetItemSummary));
