// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import TransactionDetails from 'components/TransactionDetails';
import TransactionNav from 'components/TransactionNav';
import DonutChart from 'components/DonutChart';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

type TransactionProps = {
  transactions: Transaction[],
  match: Object,
  inflow: Number,
  outflow: Number,
};

const TransactionContainer = ({ transactions, match, inflow, outflow }: TransactionProps) => {
  // find transaction by the id passed in the url
  const transaction = transactions.find(t => t.id === Number(match.params.id));
  if (!transaction) {
    return (
      <section>
        <TransactionNav />
        Ooops, transaction not found!
      </section>
    );
  }

  const isNegative = transaction.value < 0;
  // depending on transaction.value, calculate percentage accordingly
  const percentage = isNegative
    ? (100 * Math.abs(transaction.value / outflow)).toFixed(2)
    : (100 * Math.abs(transaction.value / inflow)).toFixed(2);
  // [selected transaction details, remainder outflow/inflow details]
  const chart = [
    {
      transactionId: `${transaction.id}+''`,
      value: Math.abs(transaction.value),
      description: `${transaction.description} - `,
    },
    {
      transactionId: `${transaction.id}+'-remainder'`,
      value: isNegative ? Math.abs(outflow - transaction.value) : inflow - transaction.value,
      description: isNegative ? 'Outflow Remainder - ' : 'Inflow Remainder - ',
    },
  ];

  return (
    <section>
      <TransactionNav />
      <TransactionDetails transaction={transaction} percentage={percentage} />
      <DonutChart data={chart} dataLabel="description" dataKey="transactionId" />
    </section>
  );
};

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default withRouter(connect(mapStateToProps)(TransactionContainer));
