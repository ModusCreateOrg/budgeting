import React, { Component, PropTypes } from 'react';

import BudgetGridRow from './BudgetGridRow';
import './style.scss';

class BudgetGrid extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  static defaultProps = {
    data: {}
  }

  render() {
    const { data: { transactions, categories } } = this.props;

    return (
      <div className="grid-container">
        <table className="budget-grid">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <BudgetGridRow
                key={transaction.id}
                transaction={transaction}
                categories={categories}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}


export default BudgetGrid;
