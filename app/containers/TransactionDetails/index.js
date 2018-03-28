// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { scaleOrdinal, schemeCategory20 } from 'd3';
import { injectAsyncReducers } from 'store';
import formatAmountPercentageContribution from 'utils/formatAmountPercentageContribution';
import { shuffle } from 'utils/array';
import { getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import type { Transaction } from 'modules/transactions';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import TransactionDetail from 'components/TransactionDetail';
import PieChart from 'components/PieChart';

const outflowScheme = shuffle([...schemeCategory20.slice(0, 4), ...schemeCategory20.slice(5)]);
const inflowScheme = ['#bcbd22', '#bcbd22', '#2ca02c']; // inflow always green

type TransactionDetailsProps = {
  transaction: Transaction,
  balance: number,
  categories: Object,
};

injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

class TransactionDetails extends React.Component<TransactionDetailsProps> {
  static defaultProps = {
    transaction: {},
    balance: 0,
    categories: {},
  };

  getColorScheme = (transaction: Transaction) => {
    const key = transaction.value < 0 ? 'outflow' : 'inflow';
    return this.color[key].domain([0, 1]);
  };

  color = {
    inflow: scaleOrdinal(inflowScheme),
    outflow: scaleOrdinal(outflowScheme),
  };

  render() {
    const { transaction, balance, categories } = this.props;
    const remainingBalance = balance - Math.abs(transaction.value);
    const remainingPercentage = formatAmountPercentageContribution(remainingBalance, balance, 2, false).text;
    const data = [
      {
        description: `${transaction.description}: `,
        value: Math.abs(transaction.value),
        id: transaction.id,
      },
      {
        description: `${transaction.value < 0 ? 'Remainig Outflow' : 'Remaining Inflow'} (${remainingPercentage}): `,
        value: remainingBalance,
        id: transaction.id + 1,
      },
    ];

    return (
      <section>
        <TransactionDetail transaction={transaction} balance={balance} categories={categories} />
        <PieChart data={data} dataLabel="description" dataKey="id" color={this.getColorScheme(transaction)} />;
      </section>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const transactionId = parseInt(match.params.id, 10);
  const transaction = getTransactionById(state, transactionId);
  const balance = Math.abs(transaction.value > 0 ? getInflowBalance(state) : getOutflowBalance(state));
  return {
    transaction,
    balance,
    categories: getCategories(state),
  };
};

export default connect(mapStateToProps)(TransactionDetails);
