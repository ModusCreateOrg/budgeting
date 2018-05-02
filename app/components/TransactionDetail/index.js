import React from 'react';
import { withRouter } from 'react-router-dom';
import { pie, arc, scaleOrdinal} from 'd3';
import Chart from 'components/Chart';
import Path from 'components/DonutChart/Path';
import Legend from 'components/Legend';

/* eslint-disable */
// @flow
type Props = {
  title: string,
  value: number,
  total: number,
  inflow: number,
  outflow: number,
};
// datavalue 
const dataValue = 'value'

const getArc = width => {
  const radius = width / 2
  return arc()
    .outerRadius(radius - 10)
    .innerRadius(0)
}

const getPie =  pie()
  .sort(null)
  .value(d => (d[dataValue]));
  

 // get fade of color from range
const color = scaleOrdinal().range(['#bbdefb', '#64b5f6']);


const getPercentage = (total, percentageValue) => Number(percentageValue/ total * 100).toFixed(2);


const TransactionDetail = (props: Props) => {
  const itemValue = props.value < 1 ? props.value * -1: props.value; // check if budget detail is less than 1
  const data = [{ name: 'total', value: props.total}, {name: props.title, value: itemValue }];
  const width = 250;
  const height = 250;
  const dataKey = 'value'
  return (
  <div>
    <h1 className='heading'>{props.title}</h1>
    <h5>Total Budget: ${props.total}</h5>
    <h5>
      inflow percentage:
      <span style={{ color: 'green', fontSize: 20 }}>+ {getPercentage(props.total, props.inflow)}%
      </span>
    </h5>
    <h5>
      outflow percentage:
      <span style={{ color: 'red', fontSize: 20 }}>{getPercentage(props.total, props.outflow)}%</span>
    </h5>
    <div>
      <Chart width={width} height={height} transform={`translate(${width / 2} , ${height / 2})`}>
      {getPie(data).map((datum, index) => <Path fill={color(index)} arcFn={getArc(width)} data={datum} key={index} /> )}
      </Chart>
      <Legend color={color} {...{ data, dataValue, dataKey}} />
    </div>
    <button style={{ backgroundColor: 'blue', width: 100, height: 30, borderRadius: 5, color: 'white', fontWeight: 'bold'}}onClick={() => {props.history.push('/budget')}} >
      Back
    </button>
  </div>
  )
};
export default withRouter( TransactionDetail );
