// @flow

import * as React from 'react';

import styles from './styles.scss';

type ChartProps = {
  width: number,
  height: number,
  padding: number,
  transform: string,
  children: React.Node,
};

const Chart = ({ width, height, padding, transform, children }: ChartProps) => (
  <svg className={styles.mainSvg} width={width} height={height} viewBox={`-${padding} -${padding} ${width} ${height}`}>
    <g transform={transform}>{children}</g>
  </svg>
);

Chart.defaultProps = {
  padding: 0,
  transform: '',
};

export default Chart;
