import React, { PropTypes } from 'react';

import styles from './style.scss';

const BalancePrefix = ({ text }) => <div className={styles.balanceSymbol}>{text}</div>;

BalancePrefix.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BalancePrefix;
