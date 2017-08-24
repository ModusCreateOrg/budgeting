import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const BalancePrefix = ({ text }) =>
  <div className={styles.balanceSymbol}>
    {text}
  </div>;

BalancePrefix.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BalancePrefix;
