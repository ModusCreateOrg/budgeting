import * as React from 'react';

import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

const LegendItem = ({ color, label, value }) =>
  <li style={{ color }}>
    <span>
      {label}
    </span>
    <span className={styles.value}>
      {' '}{formatAmount(value).text}{' '}
    </span>
  </li>;

LegendItem.propTypes = {
  color: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default LegendItem;
