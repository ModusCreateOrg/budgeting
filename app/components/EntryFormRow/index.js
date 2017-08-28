import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createForm, { formPropTypes } from 'utils/createForm';
import Field from 'components/Field';
import DataSelector from './DataSelector';
import styles from './style.scss';

class EntryFormRow extends Component {
  static propTypes = {
    ...formPropTypes,
    categories: PropTypes.object.isRequired,
  };

  handleKeyUp = event => {
    // submit if pressing enter
    const isEnterKey = event.keyCode === 13;
    if (isEnterKey) {
      this.handleSubmit();
    }
  };

  handleSubmit = values => {
    const { handleSubmit, initializeForm, fields } = this.props;

    // try to submit form
    const success = handleSubmit(values);

    if (success) {
      // keep the chosen category but clear everything else
      initializeForm({
        categoryId: fields.categoryId.value,
      });
    }

    this.valueRef.focus();
  };

  handleValueRefUpdate = ref => {
    this.valueRef = ref;
  };

  render() {
    const { fields: { categoryId, description, value }, valid } = this.props;

    return (
      <tr className={styles.entryFormRow}>
        <td>
          <Field component={DataSelector} data={this.props.categories} {...categoryId} />
        </td>
        <td>
          <Field component="input" type="text" placeholder="Description" onKeyUp={this.handleKeyUp} {...description} />
        </td>
        <td>
          <Field
            component="input"
            type="number"
            placeholder="Value"
            onKeyUp={this.handleKeyUp}
            handleRef={this.handleValueRefUpdate}
            {...value}
          />
          <button onClick={this.handleSubmit} disabled={!valid}>
            Add
          </button>
        </td>
      </tr>
    );
  }
}

const validateForm = ({ value }) => {
  const errors = {};

  if (!value) {
    errors.value = 'You must provide a value';
  }

  return errors;
};

export default createForm({ fields: ['categoryId', 'description', 'value'], validate: validateForm })(EntryFormRow);
