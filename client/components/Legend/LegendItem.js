import React, { PropTypes } from 'react';

import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

const LegendItem = ({ color, label, value }) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> {formatAmount(value).text} </span>
  </li>
);

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default LegendItem;
