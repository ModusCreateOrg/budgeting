import React, { PropTypes } from 'react';

import './style.scss';

const Balance = ({ children }) => {
  return (
    <div className="balance-row-container">
      <div className="balance-row">
        {children}
      </div>
    </div>
  );
};

Balance.propTypes = {
  children: PropTypes.node.isRequired
};

export default Balance;
