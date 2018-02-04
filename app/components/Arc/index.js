import React, { Component } from 'react';
import d3 from 'd3';

export default class Arc extends Component {
  constructor() {
    super();
    this.arc = d3.svg.arc();
  }
  componentWillMount() {
    this.updateD3(this.props);
  }
  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }
  updateD3(newProps) {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
  }
  render() {
    return <path d={this.arc(this.props.data)} style={{ fill: this.props.color }} />;
  }
}

class LabeledArc extends Arc {
  render() {
    let [labelX, labelY] = this.arc.centroid(this.props.data),
      labelTranslate = `translate(${labelX}, ${labelY})`;
    return (
      <g>
        {super.render()}
        <text transform={labelTranslate}
          textAnchor="middle">
          {this.props.data.data.label}
        </text>
      </g>
    );
  }
}
export { LabeledArc };
