//@flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import DonutChart from 'components/DonutChart';

type BalanceProps = {
  inflow: number,
  outflow: number,
};

type TransactionDetailProps = {
  transaction: Transaction,
  balance: BalanceProps,
};

const formatPercentage = (amount, total) => total ? parseFloat((amount / total) * 100).toFixed(2) : 0;

const TransactionDetail = ({ transaction, balance }: TransactionDetailProps) => {
  const { inflow, outflow } = balance;
  const isNegative = transaction.value < 0;
  const total = isNegative ? outflow : inflow;
  const percentage = formatPercentage(transaction.value, total);

  const transactions = [
    {
      id: transaction.id,
      description: transaction.description,
      percentage: percentage,
    }, {
      id: -1,
      description: 'Others',
      percentage: 100 - percentage
    }
  ];

  return (
    <section>
      <h2>{transaction.description}</h2>
      <h3 style={{color: isNegative ? 'red': 'green'}}>{percentage}</h3>
      <DonutChart data={transactions} dataLabel="description" dataKey="id" dataValue="percentage" dataPrefix="%" />
    </section>
  )
};

export default TransactionDetail;
