import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { sortTransactions, getInflowByCategoryName, getOutflowByCategoryName, getInflowBalance, getOutflowBalance } from 'selectors/transactions';

import StackedChart from 'components/StackedChart';

@connect(state => ({
  data: {
    inflow: sortTransactions(getInflowByCategoryName(state)),
    outflow: sortTransactions(getOutflowByCategoryName(state)),
  },
  totals: {
    inflow: getInflowBalance(state),
    outflow: Math.abs(getOutflowBalance(state)),
  }
}))
class InflowOutflow extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    totals: PropTypes.object.isRequired,
  };

  render() {
    const { data, totals } = this.props;
    return <StackedChart data={data} totals={totals} dataLabel="category" dataKey="categoryId" />;
  }
}

export default InflowOutflow;
