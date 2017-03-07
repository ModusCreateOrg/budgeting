import React from 'react';

import './style.scss';

const BudgetGrid = () => (
  <table className="budget-grid">
    <tbody>
      <tr className="grid-header">
        <th>Category</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
    </tbody>
  </table>
);

export default BudgetGrid;
