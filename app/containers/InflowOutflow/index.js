// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { TransactionSummary } from 'selectors/transactions';

import {
  sortTransactions,
  getInflowByCategoryName,
  getOutflowByCategoryName,
  getInflowBalance,
  getOutflowBalance,
} from 'selectors/transactions';

import StackedChart from 'components/StackedChart';

type InflowOutflowProps = {
  data: {
    inflow: TransactionSummary[],
    outflow: TransactionSummary[],
  },
  totals: {
    inflow: number,
    outflow: number,
  },
};

class InflowOutflow extends React.Component<InflowOutflowProps> {
  render() {
    const { data, totals } = this.props;
    return <StackedChart data={data} totals={totals} dataLabel="category" dataKey="categoryId" />;
  }
}

const mapStateToProps = state => ({
  data: {
    inflow: sortTransactions(getInflowByCategoryName(state)),
    outflow: sortTransactions(getOutflowByCategoryName(state)),
  },
  totals: {
    inflow: getInflowBalance(state),
    outflow: Math.abs(getOutflowBalance(state)),
  },
});

export default connect(mapStateToProps)(InflowOutflow);
