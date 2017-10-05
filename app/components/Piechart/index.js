import React, { Component } from 'react';
import * as d3 from "d3";
import Chart from 'components/Chart';
import { LabeledArc } from './Arc';

class Piechart extends Component {
  constructor() {
    super();
    this.pie = d3.pie().value((d) => d.value);
  }

  setVariables() {
    this.width = width;
    this.height = height;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;

  }
  
  arcGenerator(d, i) {
    return (
      <LabeledArc key={`arc-${i}`}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={d.data.color} />
  );
}

  render() {
    let pie = this.pie(this.props.data), translate = `translate(${this.props.x}, ${this.props.y})`;
    const { width, height, innerRadius, outerRadius } = this.props;

  return (
     <Chart width={width}
          height={height}
          transform={`translate(${outerRadius},${outerRadius})`}
        >
          {pie.map((d, i) => this.arcGenerator(d, i))}
        </Chart>
    )
  }
}
 
export default Piechart;
