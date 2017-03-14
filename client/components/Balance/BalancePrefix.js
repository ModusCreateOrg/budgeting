import React, { PropTypes } from 'react';

import './style.scss';

const BalancePrefix = ({ text }) => <div className="balance-symbol">{text}</div>;

BalancePrefix.propTypes = {
  text: PropTypes.string.isRequired
};

export default BalancePrefix;
