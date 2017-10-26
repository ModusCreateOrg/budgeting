// @flow
import * as React from 'react';
import { arc, pie } from 'd3';

import Legend from 'components/Legend';
import Chart from 'components/Chart';
import Path from 'components/DonutChart/Path';

import type { TransactionSummary } from 'selectors/transactions';
import styles from './styles.scss';

// pie chart types
type PieChartProps = {
  data: TransactionSummary[],
  dataLabel: string,
  dataKey: string,
  dataValue: string,
  height: number,
  innerRatio: number,
};

// class piechart to export
class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    height: 300,
    innerRatio: 300 / 2,
    dataValue: 'value',
  };

  // this event update chart variables
  componentWillMount() {
    this.updateChartVariables();
  }

  // this funct update new props
  componentWillReceiveProps(nextProps: PieChartProps) {
    const { data, color, height } = nextProps;

    const old = this.props;

    if (old.data !== data || old.color !== color || old.height !== height) {
      this.updateChartVariables();
    }
  }

  // funct to calc inner radius and outer raduis
  getPathArc = () => {
    const { height, innerRatio } = this.props;
    return arc()
      .innerRadius(height / innerRatio)
      .outerRadius(height / 2);
  };

  chart: any;
  pathArc: any;
  outerRadius: number;
  boxLength: number;
  chartPadding = 8;

  // funct to update varibales by props
  updateChartVariables = () => {
    const { data, dataValue, height } = this.props;

    this.chart = pie()
      .value(d => d[dataValue])
      .sort(null);
    this.outerRadius = height / 2;
    this.pathArc = this.getPathArc();
    this.boxLength = height + this.chartPadding * 2;
  };

  render() {
    const { data, dataLabel, dataValue, dataKey } = this.props;
    const { outerRadius, pathArc, boxLength, chartPadding } = this;

    return (
      <div className={styles.pieChart}>
        <Chart
          width={boxLength}
          height={boxLength}
          padding={chartPadding}
          transform={`translate(${outerRadius},${outerRadius})`}
        >
          {this.chart(data).map((datum, index) => (
            <Path data={datum} index={index} fill={datum.data.color} arcFn={pathArc} key={datum.data[dataKey]} />
          ))}
        </Chart>

      </div>
    );
  }
}

export default PieChart;