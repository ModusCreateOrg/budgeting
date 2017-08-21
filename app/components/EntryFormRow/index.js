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
    const {
      categoryId,
      categories,
      value,
      description,
      handleFieldChange,
      handleKeyUp,
      handleValueRefUpdate,
      handleAddButtonClick,
    } = this.props;

    return (
      <tr className={styles.entryFormRow}>
        <td>
          <DataSelector name="categoryId" value={categoryId} data={categories} onChange={handleFieldChange} />
        </td>
        <td>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleFieldChange}
            onKeyUp={handleKeyUp}
            placeholder="Description"
          />
        </td>
        <td>
          <input
            type="number"
            name="value"
            value={value}
            ref={handleValueRefUpdate}
            onChange={handleFieldChange}
            onKeyUp={handleKeyUp}
            placeholder="Value"
            className={styles.amountField}
          />
          <button onClick={handleAddButtonClick}>Add</button>
        </td>
      </tr>
    );
  }
}

export default EntryFormRow;
