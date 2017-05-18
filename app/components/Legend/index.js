import React, { PropTypes } from 'react';

import LegendItem from './LegendItem';
import styles from './styles.scss';

const Legend = ({ data, color, dataValue, dataLabel, dataKey, reverse }) => (
  <ul className={`${styles.legend} ${reverse && styles.reverse}`}>
    {data.map((item, idx) => (
      <LegendItem color={color(idx)} key={item[dataKey]} label={item[dataLabel]} value={item[dataValue]} />
    ))}
  </ul>
);

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
};

Legend.defaultProps = {
  reverse: false,
};

export default Legend;
