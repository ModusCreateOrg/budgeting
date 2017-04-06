import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getDefaultCategoryId,
  getCategories
} from 'selectors/categories';
import { actions as AppActions } from 'modules/transactions';
import DataSelector from './DataSelector';
import styles from './style.scss';

@connect(
  state => ({
    defaultCategoryId: getDefaultCategoryId(),
    categories: getCategories(state)
  }),
  (dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
  }))
)
class EntryFormRow extends Component {
  static propTypes = {
    defaultCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    categoryId: this.props.defaultCategoryId,
    description: '',
    value: ''
  }

  handleFieldChange = e => this.setState({ [e.target.name]: e.target.value });

  handleKeyUp = e => e.keyCode === 13 && this.addEntry();

  handleAddButtonClick = () => this.addEntry();

  handleValueRefUpdate = (ref) => {
    this.valueRef = ref;
  }

  addEntry = () => {
    const { categoryId, description, value } = this.state;

    this.props.actions.addTransaction({ categoryId, description, value });

    // keep the chosen category but clear everything else
    this.setState({
      description: '',
      value: ''
    });

    this.valueRef.focus();
  }

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

          <button onClick={this.handleAddButtonClick}>
            Add
          </button>
        </td>
      </tr>
    );
  }
}

export default EntryFormRow;
