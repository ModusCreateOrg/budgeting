import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { sortTransactions, getOutflowByCategoryName } from 'selectors/transactions';

import DonutChart from 'components/DonutChart';

@connect(state => ({
  data: sortTransactions(getOutflowByCategoryName(state)),
}))
class Spending extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    const { data } = this.props;

    return <DonutChart data={data} dataLabel="category" dataKey="categoryId" />;
  }
}

export default Spending;
