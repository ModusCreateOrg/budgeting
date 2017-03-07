import React, { Component, PropTypes } from 'react';

import './style.scss';

class BudgetGrid extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  static defaultProps = {
    data: {}
  }

  formatAmount = (amount) => {
    const isNegative = amount < 0;
    const formatValue = Math.abs(amount).toFixed(2).toLocaleString();

    return {
      text: `${isNegative ? '-' : ''}$${formatValue}`,
      isNegative
    };
  }

  renderRow(data) {
    const { data: { categories } } = this.props;
    const amount = this.formatAmount(data.value);
    const amountCls = amount.isNegative ? 'neg' : 'pos';

    return (
      <tr key={data.id}>
        <td>{categories[data.categoryId]}</td>
        <td>{data.description}</td>
        <td className={amountCls}>{amount.text}</td>
      </tr>
    );
  }

  render() {
    const { transactions } = this.props.data;

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
            {transactions.map(transaction => this.renderRow(transaction))}
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
