// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Transaction } from 'modules/transactions';
import { getTransactions, getTotalBudget } from 'selectors/transactions';

import DonutChart from 'components/DonutChart';

type TransactionBudgetChartProps = {
  transactions: Transaction[],
  totalBudget: number,
  transactionId: number,
};

const TransactionBudgetChart = ({ transactions, totalBudget, transactionId }: TransactionBudgetChartProps) => {

  const transaction = transactions.find(t => t.id == transactionId);
  
  var data = [
    { key: '1', name: transaction.description, value: Math.abs(transaction.value) },
    { key: '2', name: 'Other', value: totalBudget - Math.abs(transaction.value) }
  ]

  return <DonutChart data={data} dataLabel="name" dataKey="key" />;
};

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  totalBudget: getTotalBudget(state)
});

export default connect(mapStateToProps)(TransactionBudgetChart);
