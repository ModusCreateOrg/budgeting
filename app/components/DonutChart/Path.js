import * as React from 'react';

import { select, interpolate } from 'd3';

class Path extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    fill: React.PropTypes.string.isRequired,
    arcFn: React.PropTypes.func.isRequired,
    animDuration: React.PropTypes.number,
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
