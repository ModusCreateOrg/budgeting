import React, { PropTypes } from 'react';

import './style.scss';

const Balance = ({ title, amount, colorize }) => {
  const amountCls = colorize && (amount.isNegative ? 'neg' : 'pos');

  return (
    <div className="balance-wrapper">
      <div className="balance-item">
        <div className={`balance-amount ${amountCls}`}>{amount.text}</div>
        <div className="balance-title">{title}</div>
      </div>
    </div>
  );
};

Balance.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.object.isRequired,
  colorize: PropTypes.bool
};

Balance.defaultProps = {
  colorize: true
};

export default Balance;
