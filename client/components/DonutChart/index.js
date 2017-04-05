import React, { PropTypes } from 'react';
import { arc, pie, scaleSequential, interpolateMagma } from 'd3';

import styles from './styles.scss';

const DonutChart = ({ data, color, height, innerRatio, padAngle }) => {
  const outerRadius = height / 2;
  const pathArc = arc().innerRadius(height / innerRatio).outerRadius(outerRadius);
  const colorFn = color.domain && color.domain([0, data.length]);
  const chart = pie()
        .value(d => d.value)
        .padAngle(padAngle)
        .sort(null);

  return (
    <div className={styles.donutChart}>
      <svg className={styles.mainSvg} width={height} height={height}>
        <g transform={`translate(${outerRadius},${outerRadius})`}>
          {chart(data).map(
            (item, idx) => <path fill={colorFn(idx)} d={pathArc(item)} key={item.data.categoryId} />
          )}
        </g>
      </svg>
      <ul className={styles.legend}>
        {data.map(
          (item, idx) => <li style={{ color: colorFn(idx) }} key={item.categoryId}>{item.category}</li>
        )}
      </ul>
    </div>
  );
};

DonutChart.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.func,
  height: PropTypes.number,
  innerRatio: PropTypes.number,
  padAngle: PropTypes.number,
};

DonutChart.defaultProps = {
  color: scaleSequential().interpolator(interpolateMagma),
  height: 400,
  innerRatio: 4,
  padAngle: 0.05,
};

export default DonutChart;
