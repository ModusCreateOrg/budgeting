import React, { PropTypes } from 'react';

import './style.scss';

const Balance = ({ title, symbol, amount, colorize }) => {
  const amountCls = colorize && (amount.isNegative ? 'neg' : 'pos');

  return (
    <div className="balance-wrapper">
      <div className="balance-symbol">{symbol}</div>
      <div className="balance-item">
        <div className={`balance-amount ${amountCls}`}>{amount.text}</div>
        <div className="balance-title">{title}</div>
      </div>
    </div>
  );
};

Balance.propTypes = {
  title: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  amount: PropTypes.object.isRequired,
  colorize: PropTypes.bool
};

Balance.defaultProps = {
  symbol: '',
  colorize: true
};

export default Balance;
