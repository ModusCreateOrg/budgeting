import React, { Component, PropTypes } from 'react';
import { arc, pie, scaleSequential, interpolateMagma, select, interpolate } from 'd3';

import styles from './styles.scss';

class DonutChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    color: PropTypes.func,
    height: PropTypes.number,
    innerRatio: PropTypes.number,
    padAngle: PropTypes.number,
  };

  static defaultProps = {
    color: scaleSequential().interpolator(interpolateMagma),
    height: 400,
    innerRatio: 4,
    padAngle: 0.05,
  };

  // Path Animation - not working. "d" attribute is coming up undefined
  // componentDidMount() {
  //   const svg = select(this.svgRef);
  //   const path = svg.selectAll('path');

  //   path.transition()
  //     .duration(1000)
  //     .attrTween('d', (d) => {
  //       const interpolateArc = interpolate({ startAngle: 0, endAngle: 0 }, d);
  //       return t => arc(interpolateArc(t));
  //     });
  // }

  handleSvgRefUpdate = (ref) => {
    this.svgRef = ref;
  }

  render() {
    const { data, color, height, innerRatio, padAngle } = this.props;
    const outerRadius = height / 2;
    const pathArc = arc().innerRadius(height / innerRatio).outerRadius(outerRadius);
    const colorFn = color.domain && color.domain([0, data.length]);
    const chart = pie()
          .value(d => d.value)
          .padAngle(padAngle)
          .sort(null);

    return (
      <div className={styles.donutChart}>

        <svg
          className={styles.mainSvg}
          width={height}
          height={height}
          ref={this.handleSvgRefUpdate}
        >
          <g transform={`translate(${outerRadius},${outerRadius})`}>
            {chart(data).map(
              (item, idx) => <path fill={colorFn(idx)} d={pathArc(item)} key={item.data.categoryId} />
            )}
          </g>
        </svg>

        <ul className={styles.legend}>
          {data.map(
            (item, idx) => <li style={{ color: colorFn(idx) }} key={item.categoryId}>{item.category}</li>
          )}
        </ul>

      </div>
    );
  }

}

export default DonutChart;
