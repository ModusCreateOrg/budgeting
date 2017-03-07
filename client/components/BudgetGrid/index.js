import React, { Component, PropTypes } from 'react';

import './style.scss';

class BudgetGrid extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  static defaultProps = {
    data: {}
  }

  renderRow(data) {
    const { data: { categories } } = this.props;

    return (
      <tr key={data.id}>
        <td>{categories[data.categoryId]}</td>
        <td>{data.description}</td>
        <td>{data.value}</td>
      </tr>
    );
  }

  render() {
    const { transactions } = this.props.data;

    return (
      <table className="budget-grid">
        <tbody>
          <tr className="grid-header">
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
          {transactions.map(transaction => this.renderRow(transaction))}
        </tbody>
      </table>
    );
  }
}


export default BudgetGrid;
