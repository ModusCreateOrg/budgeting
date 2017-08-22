import * as React from 'react';

import styles from './styles.scss';

const Chart = ({ width, height, padding, transform, children }) =>
  <svg className={styles.mainSvg} width={width} height={height} viewBox={`-${padding} -${padding} ${width} ${height}`}>
    <g transform={transform}>
      {children}
    </g>
  </svg>;

Chart.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  padding: React.PropTypes.number,
  transform: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

Chart.defaultProps = {
  padding: 0,
  transform: '',
};

export default Chart;
