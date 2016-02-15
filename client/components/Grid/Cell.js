import React, { PropTypes } from 'react';

const Cell = ({ text, className, children }, { header }) => {
  if (header === true) {
    return (
      <th className={className}>{text}</th>
    );
  }

  return (
    <td className={className}>{text || children}</td>
  );
};

Cell.contextTypes = {
  header: PropTypes.bool
};

export default Cell;
