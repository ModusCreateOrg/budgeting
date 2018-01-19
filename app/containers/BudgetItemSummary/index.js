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
import { scaleOrdinal } from 'd3';
import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemSummaryProps = {
  transaction: Transaction,
  balance: number,
  goBack: void => void,
};

const colorSchema = {
  inflow: ['#65c799', '#ad4535'],
  outflow: ['#cc2323', '#bcc42a'],
};

/**
 * Generates color schema for info and outflow transaction
 * @param {string} flow 
 */
const selectColorScheme = (flow: 'inflow' | 'outflow') =>
  scaleOrdinal()
    .domain([0, 2])
    .range(colorSchema[flow]);

/**
 * Generates transaction data in format to be consumed by PieChart
 * 
 * @param {TransactionSummary} transaction 
 * @param {number} totalBalance 
 * @returns {Transaction[]} 
 */
const getBudgetChartData = (transaction: TransactionSummary, totalBalance: number): Transaction[] => {
  const remainingBalance = Math.abs(totalBalance) - Math.abs(transaction.value);
  return [
    { id: 0, description: 'Selected Item', value: Math.abs(transaction.value) },
    {
      id: 1,
      description: totalBalance >= 0 ? 'Remaining Income' : 'Other Expenses',
      value: remainingBalance,
    },
  ];
};

/**
   * BudgetItemSummary Renders details of an individual transaction.
   * It includes the percentage that the transaction contributes in relation
   * to the aggregate of there transactions in that currency flow {inflow | outflow}  
   */
const BudgetItemSummary = ({ balance, transaction, goBack }: BudgetItemSummaryProps) => {
  const data = getBudgetChartData(transaction, balance);
  const flow = transaction.value >= 0 ? 'inflow' : 'outflow';
  return (
    <section className={styles.budgetItemSummary}>
      <button onClick={goBack}>Back</button>
      <BudgetItemHeader transaction={transaction} balance={balance} />
      <PieChart data={data} dataLabel="description" dataKey="id" color={selectColorScheme(flow)} />;
    </section>
  );
};

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
