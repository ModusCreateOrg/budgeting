// @flow

import * as React from 'react';
import Legend from 'components/Legend';
import Chart from 'components/Chart';
import type { TransactionSummary } from 'selectors/transactions';
import { arc, pie, scaleOrdinal, schemeCategory10 } from 'd3';
import { shuffle } from 'utils/array';
import Path from './Path';
import styles from './styles.scss';

const randomScheme = shuffle(schemeCategory10);

type DonutChartProps = {
  data: TransactionSummary[],
  dataLabel: string,
  dataKey: string,
  dataValue?: string,
  color?: Function,
  height?: number,
  innerRatio?: number,
  useFormat?: boolean,
};

class DonutChart extends React.Component<DonutChartProps> {
  static defaultProps = {
    color: scaleOrdinal(randomScheme),
    height: 300,
    innerRatio: 4,
    dataValue: 'value',
    useFormat: true,
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps(nextProps: DonutChartProps) {
    const { data, color, height } = nextProps;

    const old = this.props;

    if (old.data !== data || old.color !== color || old.height !== height) {
      this.updateChartVariables();
    }
  }

  getPathArc = () => {
    const { height, innerRatio } = this.props;
    return arc()
      .innerRadius(Number(height) / Number(innerRatio))
      .outerRadius(Number(height) / 2);
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
    this.outerRadius = Number(height) / 2;
    this.pathArc = this.getPathArc();
    this.colorFn = color && color.domain && color.domain([0, data.length]);
    this.boxLength = height + this.chartPadding * 2;
  };

  render() {
    const { data, dataLabel, dataValue, dataKey, useFormat } = this.props;
    const { outerRadius, pathArc, colorFn, boxLength, chartPadding } = this;

    return (
      <div className={styles.donutChart}>
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

        <Legend color={colorFn} {...{ data, dataValue, dataLabel, dataKey, useFormat }} />
      </div>
    );
  }
}

export default DonutChart;
