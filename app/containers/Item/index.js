// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import transactionReducer from 'modules/transactions';
import type { Transaction } from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import { getTransactionWithContribution, getInflowBalance, getOutflowBalance } from 'selectors/transactions';

import ItemDetails from 'components/ItemDetails';
import PieChart from 'components/PieChart';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

type ItemProps = {
  transaction: Transaction,
  totals: {
    inflow: number,
    outflow: number,
  },
};

class ItemContainer extends React.Component<ItemProps> {
  render() {
    const { match, totals, getTransaction } = this.props;

    const transaction = getTransaction(match.params.id);
    const ghostTransaction =
      transaction.value > 0 ? totals.inflow - transaction.value : totals.outflow - transaction.value;

    return (
      <section>
        <ItemDetails transaction={transaction} />

        <PieChart
          data={[
            { ...transaction, value: Math.abs(transaction.value) },
            { id: 'ghost', description: 'Total', value: ghostTransaction },
          ]}
          dataLabel="description"
          dataKey="id"
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  getTransaction: id => getTransactionWithContribution(state, Number(id)),
  totals: {
    inflow: getInflowBalance(state),
    outflow: Math.abs(getOutflowBalance(state)),
  },
});

export default connect(mapStateToProps)(withRouter(ItemContainer));
