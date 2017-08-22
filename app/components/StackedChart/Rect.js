import * as React from 'react';

import { select, interpolate } from 'd3';

class Rect extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    fill: React.PropTypes.string.isRequired,
    y: React.PropTypes.number.isRequired,
    animDuration: React.PropTypes.number,
  };

  static defaultProps = {
    animDuration: 1000,
  };

  componentDidMount() {
    const { animDuration } = this.props;
    const rect = select(this.rectRef);
    const interpolateHeight = interpolate(1000, this.rectRef.getAttribute('height'));

    rect.transition().duration(animDuration * Math.random()).attrTween('height', () => t => interpolateHeight(t));
  }

  handleRefUpdate = ref => {
    this.rectRef = ref;
  };

  render() {
    const { width, height, fill, y } = this.props;
    return <rect ref={this.handleRefUpdate} {...{ y, height, width, fill }} />;
  }
}

export default Rect;
