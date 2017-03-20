import React, { PropTypes } from 'react';

import styles from './style.scss';

const Balance = ({ children }) => {
  return (
    <div className={styles.balanceRowContainer}>
      <div className={styles.balanceRow}>
        {children}
      </div>
    </div>
  );
};

Balance.propTypes = {
  children: PropTypes.node.isRequired
};

export default Balance;
