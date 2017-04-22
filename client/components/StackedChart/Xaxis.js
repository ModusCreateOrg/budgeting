import React, { PropTypes } from 'react';

import styles from './styles.scss';


const Xaxis = ({ className, transform, color, data, xScale }) => (
  <g {...{className, transform}}>

    {Object.keys(data).map((key, idx) => (      
      <g key={key} transform={`translate(${xScale(idx) + xScale.bandwidth() / 2}, 0)`}>

        <line stroke={color} y2="6" x1="0.5" x2="0.5" />
        <text fill={color} y="9" x="0.5" dy="0.71em">
          {key.toUpperCase()}
        </text>

      </g>
    ))}

  </g>
);


Xaxis.propTypes = {
  className: PropTypes.string,
  transform: PropTypes.string,
  color: PropTypes.string,
  data: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,  
};

Xaxis.defaultProps = {
  color: '#000'
}

export default Xaxis;
