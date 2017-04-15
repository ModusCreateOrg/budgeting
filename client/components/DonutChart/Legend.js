import React, { PropTypes } from 'react';

import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

const Legend = ({ data, color, dataValue, dataLabel, dataKey }) => (
  <ul className={styles.legend}>
    {data.map(
      (item, idx) => (
        <li style={{ color: color(idx) }} key={item[dataKey]}>
          <span>{item[dataLabel]}</span>
          <span className={styles.value}> {formatAmount(item[dataValue]).text} </span>
        </li>
      )
    )}
  </ul>
);

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.func.isRequired,
};

export default Legend;
