// @flow
import * as React from 'react';
import { select, interpolate } from 'd3';

type PathProps = {
  data: Object,
  fill: string,
  arcFn: any,
  animDuration: number,
};

class Path extends React.Component<PathProps> {
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

    path
      .transition()
      .duration(animDuration)
      .attrTween('d', () => t => arcFn(interpolateArc(t)));
  }

  pathRef: ?HTMLElement;

  handleRefUpdate = (ref: ?HTMLElement) => {
    this.pathRef = ref;
  };

  render() {
    const { data, arcFn, fill } = this.props;

    return <path ref={this.handleRefUpdate} fill={fill} d={arcFn(data)} />;
  }
}

export default Path;
