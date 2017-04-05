import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getOutflowByCategory } from 'modules/transactions';
import {
  getCategories,
  applyCategoryName
} from 'modules/categories';

import DonutChart from 'components/DonutChart';

@connect(
  state => ({
    data: getOutflowByCategory(state),
    categories: getCategories(state)
  })
)
class Spending extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired
  }

  render() {
    const { data, categories } = this.props;

    return (
      <DonutChart data={applyCategoryName(data, categories)} />
    );
  }
}

export default Spending;
