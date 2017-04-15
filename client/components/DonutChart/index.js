import React, { Component, PropTypes } from 'react';

import {
  arc,
  pie,
  scaleSequential,
  interpolateMagma
} from 'd3';

import Path from './Path';
import Legend from './Legend';
import styles from './styles.scss';


class DonutChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    dataValue: PropTypes.string.isRequired,
    dataLabel: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    color: PropTypes.func,
    height: PropTypes.number,
    innerRatio: PropTypes.number,
  };

  static defaultProps = {
    color: scaleSequential().interpolator(interpolateMagma),
    height: 300,
    innerRatio: 4,
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
  }

  chartPadding = 8;

  updateChartVariables = () => {
    const { data, dataValue, color, height } = this.props;

    this.chart = pie().value(d => d[dataValue]).sort(null);
    this.outerRadius = height / 2;
    this.pathArc = this.getPathArc();
    this.colorFn = color.domain && color.domain([0, data.length]);
    this.boxLength = height + (this.chartPadding * 2);
    this.viewBox = `-${this.chartPadding} -${this.chartPadding} ${this.boxLength} ${this.boxLength}`;
  }

  render() {
    const { data, dataLabel, dataValue, dataKey } = this.props;
    const { outerRadius, pathArc, colorFn, boxLength, viewBox } = this;

    return (
      <div className={styles.donutChart}>
        <svg
          className={styles.mainSvg}
          width={boxLength}
          height={boxLength}
          viewBox={viewBox}
        >
          <g transform={`translate(${outerRadius},${outerRadius})`}>
            {this.chart(data).map(
              (datum, index) => (
                <Path
                  data={datum}
                  index={index}
                  fill={colorFn(index)}
                  arcFn={pathArc}
                  key={datum.data[dataKey]}
                />
              )
            )}
          </g>
        </svg>

        <Legend
          data={data}
          color={colorFn}
          dataValue={dataValue}
          dataLabel={dataLabel}
          dataKey={dataKey}
        />
      </div>
    );
  }

}

export default DonutChart;
