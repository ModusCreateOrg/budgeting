import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCategories } from 'modules/categories';
import { actions as AppActions } from 'modules/transactions';
import DataSelector from './DataSelector';
import styles from './style.scss';

@connect(
  state => ({
    categories: getCategories(state)
  }),
  (dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
  }))
)
class EntryFormRow extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    categoryId: '16',
    description: '',
    value: ''
  }

  handleFieldChange = e => this.setState({ [e.target.name]: e.target.value })

  handleValueRefUpdate = (ref) => {
    this.valueRef = ref;
  }

  addEntry = (e) => {
    e.preventDefault();

    if (e.keyCode && e.keyCode !== 13) {
      return;
    }

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
            onKeyUp={this.addEntry}
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
            onKeyUp={this.addEntry}
            placeholder="Value"
            className={styles.amountField}
          />

          <button onClick={this.addEntry}>
            Add
          </button>
        </td>
      </tr>
    );
  }
}

export default EntryFormRow;
