import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const BalanceRow = ({ children }) =>
  <div className={styles.balanceRowContainer}>
    <div className={styles.balanceRow}>
      {children}
    </div>
  </div>;

BalanceRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BalanceRow;
