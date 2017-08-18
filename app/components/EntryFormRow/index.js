import React, { Component, PropTypes } from 'react';
import DataSelector from './DataSelector';
import styles from './style.scss';

class EntryFormRow extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    handleKeyUp: PropTypes.func.isRequired,
    handleValueRefUpdate: PropTypes.func.isRequired,
    handleAddButtonClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <tr className={styles.entryFormRow}>
        <td>
          <DataSelector
            name="categoryId"
            value={this.props.categoryId}
            data={this.props.categories}
            onChange={this.props.handleFieldChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="description"
            value={this.props.description}
            onChange={this.props.handleFieldChange}
            onKeyUp={this.props.handleKeyUp}
            placeholder="Description"
          />
        </td>
        <td>
          <input
            type="number"
            name="value"
            value={this.props.value}
            ref={this.props.handleValueRefUpdate}
            onChange={this.props.handleFieldChange}
            onKeyUp={this.props.handleKeyUp}
            placeholder="Value"
            className={styles.amountField}
          />
          <button onClick={this.props.handleAddButtonClick}>Add</button>
        </td>
      </tr>
    );
  }
}

export default EntryFormRow;
