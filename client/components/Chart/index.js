import React, { PropTypes } from 'react';

import styles from './styles.scss';

const Chart = ({ width, height, padding, transform, children }) => (
  <svg className={styles.mainSvg} width={width} height={height} viewBox={`-${padding} -${padding} ${width} ${height}`}>
    <g transform={transform}>
      {children}
    </g>
  </svg>
);

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.number,
  transform: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Chart.defaultProps = {
  padding: 0,
  transform: '',
};

export default Chart;
