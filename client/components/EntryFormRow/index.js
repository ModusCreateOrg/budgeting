import React, { Component, PropTypes } from 'react';
import DataSelector from './DataSelector';
import './style.scss';

class EntryFormRow extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired
  }

  state = {
    categoryId: '16',
    description: '',
    amount: ''
  }

  handleFieldChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <tr className="entryFormRow">
        <td>
          <DataSelector
            name="categoryId"
            value={this.state.categoryId}
            data={this.props.categories}
            onChange={this.handleFieldChange}
          />
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
            className="amountField"
          />

          <button>Add</button>
        </td>
      </tr>
    );
  }
}

export default EntryFormRow;
