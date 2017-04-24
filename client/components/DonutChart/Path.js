import React, { Component, PropTypes } from 'react';

import { select, interpolate } from 'd3';

class Path extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    fill: PropTypes.string.isRequired,
    arcFn: PropTypes.func.isRequired,
    animDuration: PropTypes.number,
  };

  static defaultProps = {
    animDuration: 1000,
  };

  componentDidMount() {
    const { data, arcFn, animDuration } = this.props;
    const path = select(this.pathRef);
    const interpolateArc = interpolate(
      { startAngle: 0, endAngle: 0 },
      { startAngle: data.startAngle, endAngle: data.endAngle }
    );

    path.transition().duration(animDuration).attrTween('d', () => t => arcFn(interpolateArc(t)));
  }

  handleRefUpdate = ref => {
    this.pathRef = ref;
  };

  render() {
    const { data, arcFn, fill } = this.props;

    return <path ref={this.handleRefUpdate} fill={fill} d={arcFn(data)} />;
  }
}

export default Path;
