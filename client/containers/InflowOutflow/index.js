import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  sortTransactions, 
  getInflowByCategoryName,
  getOutflowByCategoryName,
} from 'selectors/transactions';

import StackedChart from 'components/StackedChart';

@connect(
  state => ({
    data: {
      inflow: sortTransactions(getInflowByCategoryName(state)),
      outflow: sortTransactions(getOutflowByCategoryName(state))
    }
  })
)
class InflowOutflow extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { data } = this.props;
    return (
      <StackedChart
        data={data}
        dataLabel="category"
        dataKey="categoryId"
        />
    );
  }
}

export default InflowOutflow;
