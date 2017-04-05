import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getOutflowByCategoryName } from 'modules/rootReducer';

import DonutChart from 'components/DonutChart';

@connect(
  state => ({
    data: getOutflowByCategoryName(state)
  })
)
class Spending extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const { data } = this.props;

    return (
      <DonutChart data={data} />
    );
  }
}

export default Spending;
