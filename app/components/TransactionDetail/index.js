import React from 'react';

type  Props = {
  title: string,
  value: number,
  total: number,
  inflow: number,
  outflow: number
}

const getPercentage = (total, percentageValue) => {
  return Number((percentageValue/ total) * 100).toFixed(2)
}
export default (props: Props) => {
  return <div>
      <h1 className="heading">{props.title}</h1>
      <h5>Total Budget: ${props.total}</h5>
      <h5>
        inflow percentage: 
        <span style={{ color: "green" , fontSize: 20}}>
          + {getPercentage(props.total, props.inflow)}%
        </span>
      </h5>
      <h5 >
        outflow percentage:
        <span style={{ color: "red", fontSize: 20}}> 
          {getPercentage(props.total, props.outflow)}%
        </span>
      </h5>
    </div>;
};
