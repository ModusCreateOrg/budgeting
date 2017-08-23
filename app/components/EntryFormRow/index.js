// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getDefaultCategoryId, getCategories } from 'selectors/categories';
import { actions } from 'modules/transactions';
import DataSelector from './DataSelector';
import styles from './style.scss';

type EntryFormRowProps = {
  defaultCategoryId: string,
  categories: Object,
  addTransaction: Function,
};

type EntryFormRowState = {
  categoryId: string,
  description: string,
  value: string,
};

class EntryFormRow extends React.Component<EntryFormRowProps, EntryFormRowState> {
  state = {
    categoryId: this.props.defaultCategoryId,
    description: '',
    value: '',
  };

  handleFieldChange = (e: SyntheticEvent<HTMLSelectElement>) =>
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  handleKeyUp = (e: SyntheticEvent<HTMLInputElement>) => e.keyCode === 13 && this.addEntry();

  handleAddButtonClick = () => this.addEntry();

  valueRef: ?HTMLElement;

  handleValueRefUpdate = (ref: ?HTMLElement) => {
    this.valueRef = ref;
  };

  addEntry = () => {
    const { categoryId, description, value } = this.state;

    // do nothing if there's no value added
    if (value) {
      this.props.addTransaction({ categoryId, description, value });

      // keep the chosen category but clear everything else
      this.setState({
        description: '',
        value: '',
      });
    }

    if (this.valueRef) {
      this.valueRef.focus();
    }
  };

  render() {
    return (
      <tr className={styles.entryFormRow}>
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
            onKeyUp={this.handleKeyUp}
            placeholder="Description"
          />
        </td>
        <td>
          <input
            type="number"
            name="value"
            value={this.state.value}
            ref={this.handleValueRefUpdate}
            onChange={this.handleFieldChange}
            onKeyUp={this.handleKeyUp}
            placeholder="Value"
            className={styles.amountField}
          />

          <button onClick={this.handleAddButtonClick}>Add</button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  defaultCategoryId: getDefaultCategoryId(),
  categories: getCategories(state),
});

const mapDispatchToProps = {
  addTransaction: actions.addTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryFormRow);
// export default EntryFormRow;
