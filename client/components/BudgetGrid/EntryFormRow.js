import React, { Component, PropTypes } from 'react';

class EntryFormRow extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired
  }

  state = {
    categoryId: 16,
    description: '',
    amount: ''
  }

  getCategoryOptions() {
    const { categories } = this.props;

    return Object.keys(categories).map(categoryId => (
      <option
        key={categoryId}
        value={categoryId}
      >
        { categories[categoryId] }
      </option>
    ));
  }

  handleFieldChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <tr>
        <td>
          <select
            name="categoryId"
            value={this.state.categoryId}
            onChange={this.handleFieldChange}
          >
            { this.getCategoryOptions() }
          </select>
        </td>
        <td>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleFieldChange}
            placeholder="Description"
          />
        </td>
        <td>
          <input
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleFieldChange}
            placeholder="Value"
          />

          <button>Add</button>
        </td>
      </tr>
    );
  }
}

export default EntryFormRow;
