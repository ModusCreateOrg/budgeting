import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { arc, pie, scaleOrdinal, schemeCategory20 } from 'd3';

import Chart from 'components/Chart';
import Path from 'components/Path';

export default class PieChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {
    dataValue: 'value',
    dataLabel: 'label',
    dataKey: 'value',
    color: scaleOrdinal(schemeCategory20),
    size: 300,
  };

  constructor(props) {
    super();
    const { data, dataValue, size, color } = props;
    this.chart = pie()
      .value(d => d[dataValue])
      .sort(null);
    this.radius = size / 2;
    this.colorFn = color.domain && color.domain([0, data.length]);
    this.pathArc = arc()
      .innerRadius(0)
      .outerRadius(this.radius);
    this.boxLength = size + this.chartPadding * 2;
  }

  getTextPosition(datum) {
    const pos = this.pathArc.centroid(datum);
    pos[0] *= 2.5;
    pos[1] *= 2.5;
    return pos;
  }

  chartPadding = 80;

  render() {
    const { boxLength, radius, colorFn, pathArc, chartPadding } = this;
    const { data, dataKey, dataLabel } = this.props;

    return (
      <Chart width={boxLength} height={boxLength} padding={chartPadding} transform={`translate(${radius},${radius})`}>
        {this.chart(data).map((datum, index) => (
          <Path
            key={datum.data[dataKey]}
            index={index}
            data={datum}
            fill={datum.data.fill || colorFn(index)}
            arcFn={pathArc}
          />
        ))}
        {this.chart(data).map(datum => (
          <text
            key={datum.data[dataKey]}
            transform={`translate(${this.getTextPosition(datum)})`}
            style={{
              textAnchor: 'middle',
            }}
          >
            {datum.data[dataLabel]}
          </text>
        ))}
      </Chart>
    );
  }
}
