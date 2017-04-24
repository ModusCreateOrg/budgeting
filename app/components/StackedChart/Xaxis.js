import React, { PropTypes } from 'react';

import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

const Xaxis = ({ data, totals, transform, labelColor, valueColor, xScale }) => (
  <g className={styles.xAxis} transform={transform}>

    {Object.keys(data).map((key, idx) => (
      <g key={key} transform={`translate(${xScale(idx) + xScale.bandwidth() / 2}, 0)`}>
        <line stroke={labelColor} y2="6" x1="0.5" x2="0.5" />
        <text fill={labelColor} y="9" x="0.5" dy="0.8em">{key.toUpperCase()}</text>
        <text className={styles.value} fill={valueColor} y="35" x="0.5" dy="0.6em">{formatAmount(totals[key]).text}</text>
      </g>
    ))}

  </g>
);

Xaxis.propTypes = {
  transform: PropTypes.string,
  labelColor: PropTypes.string,
  valueColor: PropTypes.string,
  data: PropTypes.object.isRequired,
  totals: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,
};

Xaxis.defaultProps = {
  labelColor: '#000',
  valueColor: '#999',
  transform: '',
};

export default Xaxis;
