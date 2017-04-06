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

const chart = pie()
  .value(d => d.value)
  .sort(null);

class DonutChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
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
    const { data, color, height } = this.props;
    this.outerRadius = height / 2;
    this.pathArc = this.getPathArc();
    this.colorFn = color.domain && color.domain([0, data.length]);
    this.boxLength = height + (this.chartPadding * 2);
    this.viewBox = `-${this.chartPadding} -${this.chartPadding} ${this.boxLength} ${this.boxLength}`;
  }

  render() {
    const { data } = this.props;
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
            {chart(data).map(
              (datum, index) => (
                <Path
                  data={datum}
                  index={index}
                  fill={colorFn(index)}
                  arcFn={pathArc}
                  key={datum.data.categoryId}
                />
              )
            )}
          </g>
        </svg>

        <Legend
          data={data}
          color={colorFn}
          dataLabel="category"
          dataKey="categoryId"
        />
      </div>
    );
  }

}

export default DonutChart;
