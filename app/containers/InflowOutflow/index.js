import * as React from 'react';
import { connect } from 'react-redux';

import {
  sortTransactions,
  getInflowByCategoryName,
  getOutflowByCategoryName,
  getInflowBalance,
  getOutflowBalance,
} from 'selectors/transactions';

import StackedChart from 'components/StackedChart';

@connect(state => ({
  data: {
    inflow: sortTransactions(getInflowByCategoryName(state)),
    outflow: sortTransactions(getOutflowByCategoryName(state)),
  },
  totals: {
    inflow: getInflowBalance(state),
    outflow: Math.abs(getOutflowBalance(state)),
  },
}))
class InflowOutflow extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    totals: React.PropTypes.object.isRequired,
  };

  render() {
    const { data, totals } = this.props;
    return <StackedChart data={data} totals={totals} dataLabel="category" dataKey="categoryId" />;
  }
}

export default InflowOutflow;
