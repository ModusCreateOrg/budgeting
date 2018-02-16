// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Legend from 'components/Legend';
import Chart from 'components/Chart';
import { arc, pie, scaleOrdinal, schemeCategory20 } from 'd3';
import { shuffle } from 'utils/array';
import Path from 'components/DonutChart/Path';
import styles from './styles.scss';

const randomScheme = shuffle(schemeCategory20);

export type PieChartData = {
  value: number,
  label: string,
};

type PieChartProps = {
  data: PieChartData[],
  dataLabel: string,
  dataKey: string,
  dataValue: string,
  color: Function,
  height: number,
};

class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    color: scaleOrdinal(randomScheme),
    height: 300,
    dataValue: 'value',
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataLabel: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    dataValue: PropTypes.string,
    color: PropTypes.func,
    height: PropTypes.number,
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps(nextProps: PieChartProps) {
    const { data, color, height } = nextProps;

    const old = this.props;

    if (old.data !== data || old.color !== color || old.height !== height) {
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
    const { data, dataValue, color, height } = this.props;

    this.chart = pie()
      .value(d => d[dataValue])
      .sort(null);
    this.outerRadius = height / 2;
    this.pathArc = this.getPathArc();
    this.colorFn = color.domain && color.domain([0, data.length]);
    this.boxLength = height + this.chartPadding * 2;
  };

  render() {
    const { data, dataLabel, dataValue, dataKey } = this.props;
    const { outerRadius, pathArc, colorFn, boxLength, chartPadding } = this;

    return (
      <div className={styles.pieChart}>
        <Chart
          width={boxLength}
          height={boxLength}
          padding={chartPadding}
          transform={`translate(${outerRadius},${outerRadius})`}
        >
          {this.chart(data).map((datum, index) => (
            <Path data={datum} index={index} fill={colorFn(index)} arcFn={pathArc} key={datum.data[dataKey]} />
          ))}
        </Chart>

        <Legend color={colorFn} {...{ data, dataValue, dataLabel, dataKey }} />
      </div>
    );
  }
}

export default PieChart;
