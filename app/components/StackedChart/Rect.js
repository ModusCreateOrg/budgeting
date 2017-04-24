import React, { Component, PropTypes } from 'react';

import { select, interpolate } from 'd3';

class Rect extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
    animDuration: PropTypes.number,
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
