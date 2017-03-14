import React, { PropTypes } from 'react';

import formatAmount from 'utils/formatAmount';
import './style.scss';

const Balance = ({ title, symbol, amount, colorize }) => {
  const formattedAmount = formatAmount(amount, false);
  const amountCls = colorize && (formattedAmount.isNegative ? 'neg' : 'pos');

  return (
    <div className="balance-wrapper">
      <div className="balance-symbol">{symbol}</div>
      <div className="balance-item">
        <div className={`balance-amount ${amountCls}`}>{formattedAmount.text}</div>
        <div className="balance-title">{title}</div>
      </div>
    </div>
  );
};

Balance.propTypes = {
  title: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  amount: PropTypes.string.isRequired,
  colorize: PropTypes.bool
};

Balance.defaultProps = {
  symbol: '',
  colorize: true
};

export default Balance;
