import React, { PropTypes } from 'react';

import styles from './styles.scss';

const Legend = ({ data, color, dataLabel, dataKey }) => (
  <ul className={styles.legend}>
    {data.map(
      (item, idx) => <li style={{ color: color(idx) }} key={item[dataKey]}>{item[dataLabel]}</li>
    )}
  </ul>
);

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.func.isRequired,
};

export default Legend;
