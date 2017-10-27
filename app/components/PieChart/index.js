// @flow

import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import Chart from 'components/Chart';
import { arc, pie } from 'd3';
import Path from 'components/Path';
import styles from './styles.scss';

const colors = ['cadetblue', 'blue'];

type PieChartDataType = {
  value: number,
  name: string,
};
type PieChartProps = {
  data: PieChartDataType[],
  dataLabel: string,
  dataKey: string,
  dataValue: string,
  height: number,
};

class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    height: 300,
    innerRatio: 4,
    dataValue: 'value',
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps(nextProps: PieChartProps) {
    const { data, height } = nextProps;

    const old = this.props;

    if (old.data !== data || old.height !== height) {
      this.updateChartVariables();
    }
  }

  getPathArc = () => {
    const { height } = this.props;
    return arc()
      .innerRadius(0)
      .outerRadius(height / 2);
  };

  chart: any;
  pathArc: any;
  colorFn: any;
  outerRadius: number;
  boxLength: number;
  chartPadding = 8;

  updateChartVariables = () => {
    const { dataValue, height } = this.props;

    this.chart = pie()
      .value(d => d[dataValue])
      .sort(null);
    this.outerRadius = height / 2;
    this.pathArc = this.getPathArc();
    this.boxLength = height + this.chartPadding * 2;
  };

  render() {
    const { data, dataKey } = this.props;
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
            <Path data={datum} index={index} fill={colors[index]} arcFn={pathArc} key={datum.data[dataKey]} />
          ))}
        </Chart>
        <ul>
          {data.map((item, index) => (
            <li key={item[dataKey]} className={styles.legend} style={{ color: colors[index] }}>
              {item.name}: {formatAmount(item.value).text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PieChart;
