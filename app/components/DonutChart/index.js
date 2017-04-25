import React, { Component, PropTypes } from 'react';
import Legend from 'components/Legend';
import Chart from 'components/Chart';
import { arc, pie, scaleOrdinal, schemeCategory20 } from 'd3';
import { shuffle } from 'utils/array';
import Path from './Path';
import styles from './styles.scss';

const randomScheme = shuffle(schemeCategory20);

class DonutChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    dataLabel: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    dataValue: PropTypes.string,
    color: PropTypes.func,
    height: PropTypes.number,
    innerRatio: PropTypes.number,
  };

  static defaultProps = {
    color: scaleOrdinal(randomScheme),
    height: 300,
    innerRatio: 4,
    dataValue: 'value',
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps({ data, color, height }) {
    const old = this.props;

    if (old.data !== data || old.color !== color || old.height !== height) {
      this.updateChartVariables();
    }
  }

  getPathArc = () => {
    const { height, innerRatio } = this.props;
    return arc().innerRadius(height / innerRatio).outerRadius(height / 2);
  };

  chartPadding = 8;

  updateChartVariables = () => {
    const { data, dataValue, color, height } = this.props;

    this.chart = pie().value(d => d[dataValue]).sort(null);
    this.outerRadius = height / 2;
    this.pathArc = this.getPathArc();
    this.colorFn = color.domain && color.domain([0, data.length]);
    this.boxLength = height + this.chartPadding * 2;
  };

  render() {
    const { data, dataLabel, dataValue, dataKey } = this.props;
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

        <Legend color={colorFn} {...{ data, dataValue, dataLabel, dataKey }} />
      </div>
    );
  }
}

export default DonutChart;
