// @flow

import DonutChart from 'components/DonutChart';
import { arc } from 'd3';

export default class PieChart extends DonutChart {
  //  Just changing some functionality of DonutChart
  getPathArc = () => {
    const { height } = this.props;
    return arc()
      .innerRadius(0)
      .outerRadius(height / 2);
  };
}
