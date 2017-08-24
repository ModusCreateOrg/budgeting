import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Balance = ({ children }) =>
  <div className={styles.balanceRowContainer}>
    <div className={styles.balanceRow}>
      {children}
    </div>
  </div>;

Balance.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Balance;
