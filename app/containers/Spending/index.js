// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { TransactionSummary } from 'selectors/transactions';

import { sortTransactions, getOutflowByCategoryName } from 'selectors/transactions';

import DonutChart from 'components/DonutChart';

type SpendingProps = {
  data: TransactionSummary[],
};

class Spending extends React.Component<SpendingProps> {
  render() {
    const { data } = this.props;

    return <DonutChart data={data} dataLabel="category" dataKey="categoryId" />;
  }
}

const mapStateToProps = state => ({
  data: sortTransactions(getOutflowByCategoryName(state)),
});

export default connect(mapStateToProps)(Spending);
