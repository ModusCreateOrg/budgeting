// @flow
import * as React from 'react';
import { select, interpolate } from 'd3';

type RectProps = {
  width: number,
  height: number,
  fill: string,
  y: number,
  animDuration: number,
};

class Rect extends React.Component<RectProps> {
  static defaultProps = {
    animDuration: 1000,
  };

  componentDidMount() {
    const { animDuration } = this.props;

    const rect = select(this.rectRef);

    if (this.rectRef) {
      const interpolateHeight = interpolate(1000, this.rectRef.getAttribute('height'));

      rect
        .transition()
        .duration(animDuration * Math.random())
        .attrTween('height', () => t => interpolateHeight(t));
    }
  }

  rectRef: ?HTMLElement;

  handleRefUpdate = (ref: ?HTMLElement) => {
    this.rectRef = ref;
  };

  render() {
    const { width, height, fill, y } = this.props;
    return <rect ref={this.handleRefUpdate} {...{ y, height, width, fill }} />;
  }
}

export default Rect;
