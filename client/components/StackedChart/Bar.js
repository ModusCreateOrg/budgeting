import React, { Component, PropTypes } from 'react';
import Rect from './Rect';

class Bar extends Component {
  static propTypes = {
    yScale: PropTypes.func.isRequired,
    colorFn: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    transform: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps({ yScale, data }) {
    const old = this.props;

    if (old.yScale !== yScale || old.data !== data) {
      this.updateChartVariables();
    }
  }

  updateChartVariables = () => {
    const { yScale, data } = this.props;
    let start = yScale.range()[0];

    this.yPositions = data.map(datum => (start -= yScale(datum.value)));
  };

  render() {
    const { yPositions } = this;
    const { width, yScale, colorFn, data, transform } = this.props;

    return (
      <g transform={transform}>

        {data.map((datum, idx) => (
          <Rect
            key={datum.categoryId}
            y={yPositions[idx]}
            height={yScale(datum.value)}
            width={width}
            fill={colorFn(idx)}
          />
        ))}

      </g>
    );
  }
}

export default Bar;
